/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from "react";

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @material-ui core components
import Icon from "@mui/material/Icon";

import { useDropzone } from "react-dropzone";

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Notifications
import { useNotification } from 'context/notificationContext';
import { scaleImage } from "functions/misc";

import "dropzone/dist/dropzone.css";

const MAX_SIZE_MB = 1;

function ICDropzoneMultiple({ setFieldValue, field }) {
    
    /* eslint-disable no-unused-vars */
    const { addNotification } = useNotification();
    const [images, setImages] = useState(field.value);

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
    
        setImages((prev) => [...prev, ...resizedImages.filter((f) => f !== null)]);
    };

    useEffect(() => {
        setFieldValue(field.name, images);
    }, [images]);

    useEffect(() => {
        setImages(field.value);
    }, [field]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true,
        accept: {
            'image/*': []
        }
    });

    return (
        <MDBox 
            {...getRootProps({className: 'dropzone'})}
            display="flex"
            justifyContent="center" 
            alignItems="center"
            flexDirection="column"
        >
            <input {...getInputProps()} />
            <MDBox>
                <Icon fontSize="large">cloud_upload_outlined</Icon>
            </MDBox>
            <MDTypography variant="caption">
                {isDragActive ? "Drop the file here..." : "Drag & drop a file here, or click to select"}
            </MDTypography>
        </MDBox>
    )
}

// typechecking props for ICDropzoneMultiple
ICDropzoneMultiple.propTypes = {
    setFieldValue: PropTypes.func,
    field: PropTypes.node,
};

export default ICDropzoneMultiple;