// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// formik components
import { ErrorMessage } from "formik";

// @mui material components
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function RadioGroupField({ label, name, value, setFieldValue, options, disabled = false, ...rest }) {

  const handleChange = (event) => {
    setFieldValue(name, event.target.value); // Set the selected date in Formik
  };

  return (
    <MDBox mb={1.5}>
      <FormControl component="fieldset">
        {
          label &&
          <FormLabel component="legend">{label}</FormLabel>
        }
        <RadioGroup
          value={value} // Ensures Formik is aware of the selected value
          onChange={handleChange}
          {...rest}
        >
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
              disabled={disabled}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <MDBox mt={0.75}>
        <MDTypography component="div" variant="caption" color="error" fontWeight="regular">
          <ErrorMessage name={name} />
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for RadioGroupField
RadioGroupField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  options: PropTypes.instanceOf(Array).isRequired,
  disabled: PropTypes.bool
};

export default RadioGroupField;
