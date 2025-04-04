// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// formik components
import { ErrorMessage, Field } from "formik";

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

function FormFieldAppend({ label, name, append, ...rest }) {
  return (
    <MDBox mb={1.5}>
      <MDBox display="flex">
        <MDTypography mt="auto" fontWeight="regular" variant="button" mr={1}>{append && `${append}`}</MDTypography>
        <Field {...rest} name={name} as={MDInput} variant="standard" label={label} fullWidth />
      </MDBox>
      <MDBox mt={0.75}>
        <MDTypography component="div" variant="caption" color="error" fontWeight="regular">
          <ErrorMessage name={name} />
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for FormFieldAppend
FormFieldAppend.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  append: PropTypes.string
};

export default FormFieldAppend;
