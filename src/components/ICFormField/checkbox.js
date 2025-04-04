// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// formik components
import { ErrorMessage } from "formik";

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function CheckboxField({ label, name, value, setFieldValue, ...rest }) {

  const handleChange = (event) => {
    setFieldValue(name, event.target.checked); // Set the selected date in Formik
  };

  return (
    <MDBox mb={1.5}>
      <FormControlLabel
        control={
          <Checkbox
            checked={Boolean(value)}
            onChange={handleChange}
            color="primary"
            {...rest}
          />
        }
        label={label}
      />
      <MDBox mt={0.75}>
        <MDTypography component="div" variant="caption" color="error" fontWeight="regular">
          <ErrorMessage name={name} />
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for CheckboxField
CheckboxField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default CheckboxField;
