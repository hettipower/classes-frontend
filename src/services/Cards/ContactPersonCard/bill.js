// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Otis Admin PRO React context
import { useMaterialUIController } from "context";

function ContactPersonBill({ designation, contactNo, email, fullName, id, handleDelete, handleEdit, noGutter = false }) {
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
          mb={2}
        >
          <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {designation}
          </MDTypography>

          <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
            <MDBox>
              <MDButton 
                variant="text" 
                color="error"
                onClick={() => handleDelete(id)}
              >
                <Icon>delete</Icon>
              </MDButton>
            </MDBox>
            <MDButton 
              onClick={() => handleEdit(id)}
              variant="text" 
              color={darkMode ? "white" : "dark"}
            >
              <Icon>edit</Icon>
            </MDButton>
          </MDBox>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Full Name:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {fullName}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Contact Number:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {contactNo}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDTypography variant="caption" color="text">
          Email Address:&nbsp;&nbsp;&nbsp;
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
  id: PropTypes.string,
  designation: PropTypes.string.isRequired,
  contactNo: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default ContactPersonBill;
