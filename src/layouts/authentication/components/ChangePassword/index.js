// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

import * as Yup from "yup";

// @mui material components
import Grid from "@mui/material/Grid";

// formik components
import { Formik, Form } from "formik";

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Form components
import PasswordField from "components/ICFormField/passwordField";

const PasswordValidationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Current password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[@$!%*?&#]/, "Password must contain at least one special character"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your new password"),
});

function ChangePassword({ formData }) {

  /* eslint-disable no-unused-vars */
  const { updatePasswordData, handleSubmit } = formData;

  return (
    <Formik 
      initialValues={{ 
        currentPassword: '', 
        newPassword: '',
        confirmPassword: ''
      }}
      enableReinitialize
      onSubmit={handleSubmit}
      validationSchema={PasswordValidationSchema}
    >
      {({ values }) => (
        <Form id="reset-password-request" autoComplete="off">
          <MDTypography variant="h5">Change Password</MDTypography>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <PasswordField
                type="password"
                label="Current Password"
                name="currentPassword"
                value={values.currentPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordField
                type="password"
                label="New Password"
                name="newPassword"
                value={values.newPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordField
                type="password"
                label="Confirm New Password"
                name="confirmPassword"
                value={values.confirmPassword}
              />
            </Grid>
          </Grid>

          <MDBox mt={3} mb={1}>
            <MDTypography variant="body2" color="text">
              Your password must contain at least 6 characters including an Uppercase Letter, Number, and a Special character.
            </MDTypography>
          </MDBox>

          <MDBox mt={6} mb={1}>
            <MDButton type="submit" variant="gradient" color="info" fullWidth>
              Update Password
            </MDButton>
          </MDBox>
        </Form>
      )}
    </Formik>
  );
}

// Typechecking props for the ChangePassword
ChangePassword.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default ChangePassword;
