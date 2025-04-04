// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui icons
import Icon from "@mui/material/Icon";

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Otis Admin PRO React context
import { useMaterialUIController } from "context";

function ContactPersonBill({ designation, contact_number: contactNo, email, name, noGutter = false }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={2}
      mb={noGutter ? 0 : 1}
      sx={{ boxShadow: `0 0 8px #aaa` }}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {name}
          </MDTypography>
        </MDBox>
        <MDBox mb={2} lineHeight={0}>
          <MDTypography variant="caption">
            {designation}
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            <Icon>phone</Icon>&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {contactNo}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDTypography variant="caption" color="text">
          <Icon>email</Icon>&nbsp;&nbsp;&nbsp;
          <MDTypography variant="caption" fontWeight="medium">
            {email}
          </MDTypography>
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// Typechecking props for the ContactPersonBill
ContactPersonBill.propTypes = {
  designation: PropTypes.string.isRequired,
  contact_number: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default ContactPersonBill;
