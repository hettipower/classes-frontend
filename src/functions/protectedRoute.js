import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { jwtDecode } from "jwt-decode";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Authentication Functions
import { isLoginValid, getLoginData } from "functions/auth";

// store
import {  useDispatch } from 'react-redux';
import { setUserData } from 'store/actions/usersActions';

function ProtectedRoute({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    const loggedIn = isLoginValid();
    const dispatch = useDispatch();
    const { token } = getLoginData();

    // Define public paths accessible to unauthenticated users
    const publicPaths = ['/authentication/sign-in', '/authentication/reset-password', '/authentication/update-user'];

    useEffect(() => {
        if (!loggedIn && !publicPaths.includes(location.pathname)) {
            // Redirect to login if not authenticated
            navigate("/authentication/sign-in", { replace: true });
        }

        if( token ) {
            const decoded = jwtDecode(token);
            dispatch(setUserData(decoded));
        }

    }, [location.pathname]); // Run effect on every route change

    return children;
};

// Typechecking props for the ProtectedRoute
ProtectedRoute.propTypes = {
    children: PropTypes.node,
};

export default ProtectedRoute;
