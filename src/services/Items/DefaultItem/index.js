import { forwardRef } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// custom styles for the DefaultItem
import defaultItemIconBox from "services/Items/DefaultItem/styles";

const DefaultItem = forwardRef(({ color = "info", icon, title, description, ...rest }, ref) => (
  <MDBox {...rest} ref={ref} display="flex" alignItems="center">
    <MDBox sx={(theme) => defaultItemIconBox(theme, { color })}>
      <Icon>{icon}</Icon>
    </MDBox>
    <MDBox ml={2} mt={0.5} lineHeight={1.4}>
      <MDTypography display="block" variant="button" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular" color="text">
        {description}
      </MDTypography>
    </MDBox>
  </MDBox>
));

// Typechecking props for the DefaultItem
DefaultItem.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default DefaultItem;
