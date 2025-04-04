/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect, useCallback } from 'react'

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

import "dropzone/dist/dropzone.css";

function ICCSVDropzone({ setFieldValue, field }) {
    
    /* eslint-disable no-unused-vars */
    const { addNotification } = useNotification();
    const [preview, setPreview] = useState(`${process.env.REACT_APP_PUBLIC_URL}/${field.value}`);

    useEffect(() => {
        setPreview(`${process.env.REACT_APP_PUBLIC_URL}/${field.value}`)
    }, [field]);

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {

        const file = acceptedFiles[0];
        setFieldValue(field.name, file);

        // Create a Data URL using FileReader
        if( file ) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setPreview(reader.result); // Set the Data URL for preview
            };
            reader.readAsDataURL(file); // Read the file as Data URL
        }

        rejectedFiles.map((item) => ({
            errors: item.errors.map((e) => addNotification(`${e.message}`, 'error')),
        }));

    }, []);
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'text/csv': [], // Restrict to CSV files
            '.csv': [] // Allow files with a `.csv` extension
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

// typechecking props for ICCSVDropzone
ICCSVDropzone.propTypes = {
    setFieldValue: PropTypes.func,
    field: PropTypes.node,
};

export default ICCSVDropzone;