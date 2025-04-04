import { useState, useEffect } from "react";

import { OTPInputField } from 'react-otp-input-type';

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
import ChangePassword from "layouts/authentication/components/ChangePassword";

// Images
import brandWhite from "assets/images/logo.webp";

// Otis Admin PRO React contexts
import { useMaterialUIController } from "context";

// Authentication Functions
import axiosInstance from 'functions/axiosConfig';
import { getLoginData } from "functions/auth";
import { removeLeadingZero } from "functions/misc";

// Notifications
import { useNotification } from 'context/notificationContext';

// Store
import { useSelector } from 'react-redux';

function UpdateUser() {

  /* eslint-disable no-unused-vars */
  const [controller] = useMaterialUIController();
  const { addNotification } = useNotification();
  const { otpNum } = controller;
  const [updatePasswordData, setUpdatePasswordData] = useState(false);
  const [otpSucess, setOtpSucess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [numOfInputs, setNumOfInputs] = useState(6);
  const userData = useSelector((state) => state.users.userData);
  const { token } = getLoginData();

  useEffect(() => {
    if (!updatePasswordData) return undefined; 
    if (otpSucess) return undefined;

    setTimeLeft(60);

    // Start countdown
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      clearInterval(timer);
      setUpdatePasswordData(false);
      addNotification('OTP expired. Try again', 'error', 5000);
    }, 60000);
    
    function cleanup() {
      clearInterval(timer);
      clearTimeout(timeout);
    }

    return () => cleanup();
  }, [updatePasswordData, setUpdatePasswordData, otpSucess]);


  const handleSubmit = (values, actions) => {
    if( userData ) {
      axiosInstance.get(`/users/request-otp/${removeLeadingZero(userData.mobile)}`)
      .then((response) => {
        if( response.data.status ) {
          setUpdatePasswordData({ ...values, data: response.data.data});
        }
      })
      .catch((err) => {
        addNotification(err?.response?.data?.message, 'error');
      });
    }
  };

  const handleOPTSubmit = () => {
    if( otp ) {
      const data = {
        msisdn: removeLeadingZero(userData.mobile),
        oldPassword: updatePasswordData.currentPassword,
        newPassword: updatePasswordData.newPassword,
        otp,
        otpRef: updatePasswordData.data
      }

      axiosInstance.post('/users/update-password', data, {
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        if( response.data.status ) {
          addNotification(response.data.message, 'success');
          navigate('/authentication/sign-in');
        }
      })
      .catch((err) => {
        addNotification(err?.response?.data?.message, 'error');
      });
    } else {
      addNotification('OPT is required', 'error');
    }
  };

  const renderForms = () => {
    
    if (updatePasswordData) {
      return(
        <MDBox sx={{ textAlign: 'center' }}>
          <MDTypography variant="h6">Please enter {numOfInputs} digit OTP code.</MDTypography>
          <MDBox mx="auto" my={1.5} sx={{ display: 'flex' , justifyContent: 'center' }}>
            <OTPInputField 
              numOfInputs={numOfInputs}
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

    return <ChangePassword formData={{
      updatePasswordData,
      handleSubmit
    }} />
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

export default UpdateUser;
