/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from 'react'

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @material-ui core components
import Icon from "@mui/material/Icon";

import { useDropzone } from "react-dropzone";

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Notifications
import { useNotification } from 'context/notificationContext';
import { scaleImage } from "functions/misc";

import "dropzone/dist/dropzone.css";

const MAX_SIZE_MB = 1;

function ICDropzone({ setFieldValue, field }) {
    
    /* eslint-disable no-unused-vars */
    const { addNotification } = useNotification();
    const [preview, setPreview] = useState(`${process.env.REACT_APP_PUBLIC_URL}/${field.value}`);
    const [image, setImage] = useState(field.value);

    const onDrop = async (acceptedFiles) => {
        const resizedImages = await Promise.all(
            acceptedFiles.map(async (file) => {
                if (file.size > MAX_SIZE_MB * 1024 * 1024) {
                    try {
                        const resizedImage = await scaleImage(file, MAX_SIZE_MB);
                        return new File([resizedImage], file.name, {
                            type: file.type,
                        });
                    } catch (error) {
                        addNotification(error, 'error');
                        return null;
                    }
                }

                return file;
            })
        );
    
        setImage(resizedImages.filter((f) => f !== null)[0]);
    };

    useEffect(() => {
        if (!image) {
            return;
        }

        setFieldValue(field.name, image);

        if (image instanceof Blob) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setPreview(e.target.result); // Set the data URL as image source
            };

            reader.readAsDataURL(image); // Read the blob as data URL
        } else {
            setPreview(`${process.env.REACT_APP_PUBLIC_URL}/${image}`);
        }

    }, [image]);

    useEffect(() => {
        setImage(field.value);
    }, [field]);
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'image/*': []
        },
    });

    return (
        <MDBox 
            {...getRootProps({className: 'dropzone'})}
            display="flex"
            justifyContent="center" 
            alignItems="center"
        >
            <input {...getInputProps()} />
            {field.value ? (
                <MDBox 
                    display="flex"
                    justifyContent="center" 
                    alignItems="center"
                    flexDirection="column"
                >
                    {preview && (
                        <MDAvatar
                            src={preview} // Display the preview image
                            alt="Preview"
                            sx={{ width: 56, height: 56, marginTop: 2 }}
                            variant="rounded"
                        />
                    )}
                    <MDTypography variant="caption">{field.value.name}</MDTypography>
                </MDBox>
            ) : (
                <MDBox
                    display="flex"
                    justifyContent="center" 
                    alignItems="center"
                    flexDirection="column"
                >
                    <MDBox>
                        <Icon fontSize="large">cloud_upload_outlined</Icon>
                    </MDBox>
                    <MDTypography variant="caption">
                    {isDragActive ? "Drop the file here..." : "Drag & drop a file here, or click to select"}
                    </MDTypography>
                </MDBox>
            )}
        </MDBox>
    )
}

// typechecking props for ICDropzone
ICDropzone.propTypes = {
    setFieldValue: PropTypes.func,
    field: PropTypes.node,
};

export default ICDropzone;