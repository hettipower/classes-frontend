import { useRef, useEffect } from 'react';

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import useResizeObserver from 'functions/useResizeObserver';

function Modal({ handleClose, children = false, title, open, smallSize }) {

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [open]);

    const targetRef = useRef(null);

    /* eslint-disable no-unused-vars */
    useResizeObserver(targetRef, (element) => {
    });

    return (
        <MDBox
            ref={targetRef}
            sx={{
                position: 'fixed',
                left: 0,
                top: 0,
                zIndex: '100000',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.7)',
                display: `${open ? 'block' : 'none'}`
            }}
        >
            <Grid container justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
                <Grid item xs={12} lg={6}>
                    <Card sx={{ height: "100%" }}>
                        <MDBox>
                            <MDBox pt={3} pl={3} pr={3} pb={1.5} display="flex" justifyContent="space-between">
                                <MDTypography variant="h6" fontWeight="bold">{title}</MDTypography>
                                
                                <MDBox 
                                    ml="auto"
                                    onClick={() => handleClose()}
                                    sx={{ cursor: "pointer" }} 
                                >
                                    <Icon fontSize="small">
                                    close
                                    </Icon>
                                </MDBox>
                            </MDBox>
                            <MDBox pt={1.5} pl={3} pr={3} pb={3}
                                sx={{
                                    borderTop: ({ borders: { borderWidth, borderColor } }) =>
                                      `${borderWidth[1]} solid ${borderColor}`,
                                    height: `${!smallSize ? 'calc(100vh - 200px)' : ''}`,
                                    overflow: "auto"
                                }}
                            >
                                {children}
                            </MDBox>
                        </MDBox>
                    </Card>
                </Grid>
            </Grid>
        </MDBox>
    );
}

// Typechecking props for the Modal
Modal.propTypes = {
    handleClose: PropTypes.func,
    children: PropTypes.node,
    title: PropTypes.string,
    open: PropTypes.bool,
    smallSize: PropTypes.bool
};
  
export default Modal;
  