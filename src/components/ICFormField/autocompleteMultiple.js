// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// formik components
import { ErrorMessage } from "formik";

// @mui material components
import Autocomplete from "@mui/material/Autocomplete";

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

function AutocompleteMultipleField({ label, name, options, setFieldValue, value, ...rest }) {

  return (
    <MDBox mb={1.5}>
      <Autocomplete
        label={label}
        options={options}
        getOptionLabel={(option) => option.label}
        value={options.filter((option) =>
          value.includes(option.value)
        )}
        onChange={(event, newValue) => {
          // Store only the `value` of each selected option
          const valuesOnly = newValue.map((option) => option.value);
          setFieldValue(name, valuesOnly);
        }}
        renderInput={(params) => (
          <MDInput {...rest} {...params} label={`Select a ${label}`} />
        )}
        disablePortal
        multiple
      />
      <MDBox mt={0.75}>
        <MDTypography component="div" variant="caption" color="error" fontWeight="regular">
          <ErrorMessage name={name} />
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for AutocompleteMultipleField
AutocompleteMultipleField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.instanceOf(Array).isRequired,
  setFieldValue: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default AutocompleteMultipleField;
