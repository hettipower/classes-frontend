import { useState, useEffect } from "react";

import { OTPInputField } from 'react-otp-input-type';

// formik components
import { Formik, Form } from "formik";

// @mui material components
import Card from "@mui/material/Card";

// react-router-dom components
import { useNavigate } from "react-router-dom";

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Otis Admin PRO React contexts
import { useMaterialUIController } from "context";

// Form components
import FormField from "components/ICFormField";

// Images
import brandWhite from "assets/images/logo.webp";

// Authentication Functions
import axiosInstance from 'functions/axiosConfig';

// Notifications
import { useNotification } from 'context/notificationContext';

function ResetPassword() {

  /* eslint-disable no-unused-vars */
  const [controller] = useMaterialUIController();
  const { addNotification } = useNotification();
  const { otpNum } = controller;
  const [resetPasswordData, setResetPasswordData] = useState(false);
  const [otpSucess, setOtpSucess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');

  useEffect(() => {
    if (!resetPasswordData) return undefined; 
    if (otpSucess) return undefined;

    setTimeLeft(60);

    // Start countdown
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      clearInterval(timer);
      setResetPasswordData(false);
      addNotification('OTP expired. Resend reset password request again', 'error', 5000);
    }, 60000);
    
    function cleanup() {
      clearInterval(timer);
      clearTimeout(timeout);
    }

    return () => cleanup();
  }, [resetPasswordData, setResetPasswordData, otpSucess]);

  const submitForm = async (values, actions) => {

    axiosInstance.put('/auth/reset-password-notify', {
      email: values.email,
    })
    .then((response) => {
      if( response.data.statusCode === 200 ) {
        setResetPasswordData(response.data.data);
      }
    })
    .catch((err) => {
      addNotification(err?.response?.data?.message, 'error');
    });

    actions.setSubmitting(false);
    // actions.resetForm();
  };

  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  const handleOPTSubmit = () => {
    if( otp ) {
      axiosInstance.put('/auth/vaild-otp', {
        tempId: resetPasswordData.tempId,
        userId: resetPasswordData.userId,
        otpTxt: otp
      })
      .then((response) => {
        if( response.data.statusCode === 200 ) {
          setOtpSucess(true);
        }
      })
      .catch((err) => {
        addNotification(err?.response?.data?.message, 'error');
      });
    } else {
      addNotification('OPT is required', 'error');
    }
  };

  const handleResetPasswordSubmit = (values, actions) => {

    if( !(values.password && values.confirmPassword) ) {
      addNotification('All fields are required.', 'error');
    } else if( values.password !== values.confirmPassword ) {
      addNotification('Password confirmation does not match.', 'error');
    } else {
      axiosInstance.put('/auth/change-password', {
        userId: resetPasswordData.userId,
        changePassword: values.password,
      })
      .then((response) => {
        if( response.data.statusCode === 200 ) {
          navigate('/authentication/sign-in');
        }
      })
      .catch((err) => {
        addNotification(err?.response?.data?.message, 'error');
      });
    }
    

    actions.setSubmitting(false);
    // actions.resetForm();
  };

  const renderForms = () => {
    
    if (resetPasswordData && otpSucess) {
      return (
        <Formik 
          initialValues={{ password: '', confirmPassword: '' }}
          enableReinitialize
          onSubmit={handleResetPasswordSubmit}
        >
          {({ values }) => (
            <Form id="reset-password" autoComplete="off">
              <FormField
                type="password"
                label="Password"
                name="password"
                value={values.password}
              />

              <FormField
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                value={values.confirmPassword}
              />
              
              <MDBox mt={6} mb={1}>
                <MDButton type="submit" variant="gradient" color="info" fullWidth>
                  submit
                </MDButton>
              </MDBox>
            </Form>
          )}
        </Formik>
      )
    }
    
    if (resetPasswordData) {
      return(
        <MDBox sx={{ textAlign: 'center' }}>
          <MDTypography variant="h6">Please enter {otpNum} digit OTP code.</MDTypography>
          <MDBox mx="auto" my={1.5} sx={{ display: 'flex' , justifyContent: 'center' }}>
            <OTPInputField 
              numOfInputs={otpNum}
              handleChange={setOtp}
              isOnlyNumberAllowed="true"
              styleObject={{
                borderColor: `#d7d7d7`,
                width: 40,
                height: 40
              }}
            />
          </MDBox>
          <MDTypography variant="subtitle2">OTP will expire in <strong>{timeLeft}</strong> second(s).</MDTypography>
          <MDBox mt={6} mb={1}>
            <MDButton type="submit" variant="gradient" color="info" fullWidth onClick={()=> handleOPTSubmit()}>
              submit
            </MDButton>
          </MDBox>
        </MDBox>
      )
    };

    return (
      <Formik 
        initialValues={{ email: '' }}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form id="reset-password-request" autoComplete="off">
            <FormField
              type="email"
              label="Email"
              name="email"
              value={values.email}
            />
            <MDBox mt={6} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                reset
              </MDButton>
            </MDBox>
          </Form>
        )}
      </Formik>
    );
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
          {renderForms()}
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default ResetPassword;
