import { useState } from "react";

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// formik components
import { ErrorMessage } from "formik";

// @mui material components
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

import axiosInstance from 'functions/axiosConfig';

function AilmentSelectField({ label, name, setFieldValue, value, ...rest }) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch data from API
  const fetchOptions = async (searchTerm) => {
    if (!searchTerm) {
      setOptions([]); // Clear options if search is empty
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `https://clinicaltables.nlm.nih.gov/api/conditions/v3/search`,
        {
          params: {
            terms: searchTerm,
            df: "primary_name",
            maxList: 7,
          },
        }
      );

      // Extract primary names from the response
      const fetchedOptions = response.data[3] || [];
      const filterAilments = fetchedOptions && fetchedOptions.map( item => ({ label: item[0], value: item[0]}));

      setOptions(filterAilments);
    } catch (error) {
      setOptions([]); // Reset options on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBox mb={1.5}>
      <Autocomplete
        freeSolo
        options={options}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue); // Update user input
          fetchOptions(newInputValue); // Fetch new options
        }}
        onChange={(event, newValue) => {
          setFieldValue(name, newValue?.value || "");
        }}
        renderInput={(params) => (
          <MDInput
            {...rest}
            {...params}
            label="Search Ailment"
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      <MDBox mt={0.75}>
        <MDTypography component="div" variant="caption" color="error" fontWeight="regular">
          <ErrorMessage name={name} />
        </MDTypography>
      </MDBox>
    </MDBox>
  )

  /* return (
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
      />
      <MDBox mt={0.75}>
        <MDTypography component="div" variant="caption" color="error" fontWeight="regular">
          <ErrorMessage name={name} />
        </MDTypography>
      </MDBox>
    </MDBox>
  ); */
}

// typechecking props for AilmentSelectField
AilmentSelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.instanceOf(Array).isRequired,
  setFieldValue: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default AilmentSelectField;
