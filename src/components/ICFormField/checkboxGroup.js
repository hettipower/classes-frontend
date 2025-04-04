// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// formik components
import { ErrorMessage } from "formik";

// @mui material components
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function CheckboxGroupField({ label, name, value, setFieldValue, options, ...rest }) {

  /* eslint-disable no-unused-vars */
  const handleCheckboxChange = (val) => {
    if (value.includes(val)) {
      // Remove if already selected
      setFieldValue( name, value.filter((option) => option !== val) );
    } else {
      // Add if not selected
      setFieldValue(name, [...value, val]);
    }
  };

  return (
    <MDBox mb={1.5}>
      <FormControl component="fieldset">
        {
          label &&
          <FormLabel component="legend">{label}</FormLabel>
        }
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={
              <Checkbox
                name={name}
                value={option.value}
                checked={value.includes(option.value)}
                onChange={() => handleCheckboxChange(option.value)}
                {...rest}
                defaultChecked
              />
            }
            label={option.label}
          />
        ))}
      </FormControl>
      <MDBox mt={0.75}>
        <MDTypography component="div" variant="caption" color="error" fontWeight="regular">
          <ErrorMessage name={name} />
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for CheckboxGroupField
CheckboxGroupField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  options: PropTypes.instanceOf(Array).isRequired
};

export default CheckboxGroupField;
