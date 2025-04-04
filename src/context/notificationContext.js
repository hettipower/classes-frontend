import React, { createContext, useState, useContext, useMemo } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

// @mui material components
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

// Create a Context for the Notification system
const NotificationContext = createContext();

// Custom hook to use the Notification Context
export const useNotification = () =>  useContext(NotificationContext);

// Provider component that holds the notification state
function NotificationProvider({ children }) {
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'info', // can be 'success', 'error', 'warning', 'info'
        duration: 3000
    });

    const addNotification = (message, severity = 'info', duration = 3000) => {
        setNotification({
            open: true,
            message,
            severity,
            duration
        });
    };

    const handleClose = () => {
        setNotification({ ...notification, open: false });
    };

    // Memoize the value object to avoid re-creation on every render
    const value = useMemo(
        () => ({
            addNotification,
        }),
        [] // Empty array ensures the value is only recalculated when dependencies change
    );

    return (
        <NotificationContext.Provider value={value}>
        {children}
            <Snackbar
                TransitionComponent={Slide}
                open={notification.open}
                autoHideDuration={notification.duration}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{ zIndex: 1000000000 }}
            >
                <Alert onClose={handleClose} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    );
}

// Validate the 'children' prop using PropTypes
NotificationProvider.propTypes = {
    children: PropTypes.node.isRequired, // 'children' prop is required
};

export { NotificationProvider };