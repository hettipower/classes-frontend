import { forwardRef } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const ListItem = forwardRef(({ title, description, ...rest }, ref) => (
  <MDBox {...rest} ref={ref} display="flex" alignItems="center">
    <MDBox mb={1.5} lineHeight={1}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular" color="text" sx={{ whiteSpace: "pre-line" }}>
        {description}
      </MDTypography>
    </MDBox>
  </MDBox>
));

// Typechecking props for the ListItem
ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ListItem;
