// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// formik components
import { ErrorMessage } from "formik";

import { format } from "date-fns";

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

// react-flatpickr components
import Flatpickr from "react-flatpickr";

// react-flatpickr styles
import "flatpickr/dist/flatpickr.css";

function DateTimePicker({ label, name, value, setFieldValue, ...rest }) {

  const handleChange = (date) => {
    const formattedDate = date.length ? format(date[0], "yyyy-MM-dd hh:mm a") : "";
    setFieldValue(name, formattedDate); // Set the selected date in Formik
  };

  return (
    <MDBox mb={1.5}>
      <Flatpickr
        onChange={handleChange}
        options={{
          dateFormat: "Y-m-d h:i K",
          enableTime: true,
        }}
        value={value}
        placeholder={label}
        render={({ defaultValue }, ref) => (
          <MDInput {...rest} label={label} placeholder={label} name={name} value={value} fullWidth defaultValue={defaultValue} inputRef={ref} />
        )}
      />
      <MDBox mt={0.75}>
        <MDTypography component="div" variant="caption" color="error" fontWeight="regular">
          <ErrorMessage name={name} />
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for DateTimePicker
DateTimePicker.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default DateTimePicker;
