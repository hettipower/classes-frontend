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

function AutocompleteField({ label, name, options, setFieldValue, value, disabled = false, ...rest }) {
  return (
    <MDBox mb={1.5}>
      <Autocomplete
        label={label}
        options={options}
        getOptionLabel={(option) => option.label}
        value={
          options.find((option) => option.value === value) || null
        }
        onChange={(event, newValue) => {
          setFieldValue(name, newValue?.value || "");
        }}
        renderInput={(params) => (
          <MDInput {...rest} {...params} label={`Select a ${label}`} />
        )}
        disablePortal
        disabled={disabled}
      />
      <MDBox mt={0.75}>
        <MDTypography component="div" variant="caption" color="error" fontWeight="regular">
          <ErrorMessage name={name} />
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for AutocompleteField
AutocompleteField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.instanceOf(Array).isRequired,
  setFieldValue: PropTypes.func.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
};

export default AutocompleteField;
