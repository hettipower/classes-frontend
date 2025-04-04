import { useEffect } from "react";

import { jwtDecode } from "jwt-decode";

// formik components
import { Formik, Form } from "formik";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Form components
import FormField from "components/ICFormField";

// Authentication Functions
import { setLoginData, isLoginValid } from "functions/auth";
import axiosInstance from 'functions/axiosConfig';

// Images
import brandWhite from "assets/images/logo.webp";

// Notifications
import { useNotification } from 'context/notificationContext';

// store
import {  useDispatch } from 'react-redux';
import { setUserData } from 'store/actions/usersActions';

function Basic() {
  /* eslint-disable no-unused-vars */
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedIn = isLoginValid();
    if( loggedIn ) {
      const routePath = '/dashboard';

      navigate(routePath);
    }
  }, []);

  const submitForm = async (values, actions) => {

    axiosInstance.post('/auth/login', {
      username: values.username,
      password: values.password
    })
    .then((response) => {
      if( response.data.statusCode === 200 ) {

        let routePath = '';
        const decoded = jwtDecode(response.data.data);

        // Check is first login
        if( decoded.is_active === 2 ) {
          routePath = '/authentication/update-user';
        } else {
          
          setLoginData(response.data.data, 24 * 60 * 60 * 1000);

          routePath = '/dashboard';
        }
        
        dispatch(setUserData(decoded));
        navigate(routePath);
      }
    })
    .catch((err) => {
      addNotification(err?.response?.data?.message, 'error');
    });

    actions.setSubmitting(false);
    actions.resetForm();
    
  };

  const handleSubmit = (values, actions) => {
    if( values.username && values.password ) {
      submitForm(values, actions);
    } else {
      addNotification('All fields required!', 'error');
    }
  };

  return (
    <BasicLayout>
      <Card>
        <MDBox
          component="img"
          variant="gradient"
          borderRadius="lg"
          mx="auto"
          p={2}
          mb={1}
          src={brandWhite}
          maxWidth="170px"
        />
        <MDBox pt={4} pb={3} px={3}>
          <Formik 
            initialValues={{ username: '' , password: '' }}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form autoComplete="off">
                <FormField
                  type="text"
                  label="Username"
                  name="username"
                  value={values.username}
                  required
                />
                <FormField
                  type="password"
                  label="Password"
                  name="password"
                  value={values.password}
                  required
                />
                <MDBox mt={4} mb={1}>
                  <MDButton type="submit" variant="gradient" color="info" fullWidth>
                    sign in
                  </MDButton>
                </MDBox>
                <MDBox mt={3} mb={1} textAlign="center">
                  <MDTypography variant="button" color="text">
                    Forgot your password?{" "}
                    <MDTypography
                      component={Link}
                      to="/authentication/reset-password"
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      textGradient
                    >
                      Reset Password
                    </MDTypography>
                  </MDTypography>
                </MDBox>
              </Form>
            )}
          </Formik>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
