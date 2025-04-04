// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// formik components
import { ErrorMessage } from "formik";

// @mui material components
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function SwitchField({ label, name, value, setFieldValue, ...rest }) {

  const handleChange = (event) => {
    setFieldValue(name, event.target.checked ? 1 : 0); // Set the selected date in Formik
  };

  return (
    <MDBox mb={1.5}>
      <FormControlLabel
        control={
          <Switch
            checked={value}
            onChange={handleChange}
            color="primary"
          />
        }
        label={label}
        {...rest}
      />
      <MDBox mt={0.75}>
        <MDTypography component="div" variant="caption" color="error" fontWeight="regular">
          <ErrorMessage name={name} />
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for SwitchField
SwitchField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default SwitchField;
