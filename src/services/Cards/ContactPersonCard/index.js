// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";
// import Tooltip from "@mui/material/Tooltip";

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";


function ContactPersonCard({ designation, fullName, contactNo, email, handleEdit, id }) {

  return (
    <MDBox
      borderRadius="lg"
      display="flex"
      justifyContent="space-between"
      p={3}
      sx={{
        border: ({ borders: { borderWidth, borderColor } }) =>
          `${borderWidth[1]} solid ${borderColor}`,
        height: '100%'
      }}
    >
      <MDBox>
        {
          designation && 
          <MDBox lineHeight={0.5} mb={2}>
            <MDTypography variant="h6" fontWeight="medium">Designation</MDTypography>
            <MDTypography variant="caption" fontWeight="medium">
              {designation}
            </MDTypography>
          </MDBox>
        }
        
        {
          fullName && 
          <MDBox lineHeight={0.5} mb={2}>
            <MDTypography variant="h6" fontWeight="medium">Full Name</MDTypography>
            <MDTypography variant="caption" fontWeight="medium">
              {fullName}
            </MDTypography>
          </MDBox>
        }

        {
          contactNo && 
          <MDBox lineHeight={0.5} mb={2}>
            <MDTypography variant="h6" fontWeight="medium">Contact Number</MDTypography>
            <MDTypography variant="caption" fontWeight="medium">
              {contactNo}
            </MDTypography>
          </MDBox>
        }

        {
          email && 
          <MDBox lineHeight={0.5} mb={2}>
            <MDTypography variant="h6" fontWeight="medium">Email</MDTypography>
            <MDTypography variant="caption" fontWeight="medium">
              {email}
            </MDTypography>
          </MDBox>
        }
      </MDBox>
      <MDBox ml="auto" lineHeight={0}>
        <Icon 
          onClick={() => handleEdit(id)}
          sx={{ cursor: "pointer" }} 
          fontSize="small"
        >
          edit
        </Icon>
      </MDBox>
    </MDBox>
  );
}

// Typechecking props for the ContactPersonCard
ContactPersonCard.propTypes = {
  id: PropTypes.string,
  designation: PropTypes.string,
  fullName: PropTypes.string,
  contactNo: PropTypes.string,
  email: PropTypes.string,
  handleEdit: PropTypes.func,
};

export default ContactPersonCard;
