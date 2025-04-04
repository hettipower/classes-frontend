// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Images
import pattern from "assets/images/Member_App_Card_Bg_v1.2.png";

function MasterCard({ color = "dark", number, holder, expires, agency, company, holderName }) {

  return (
    <Card
      sx={({ palette: { gradients }, functions: { linearGradient }, boxShadows: { xl } }) => ({
        background: gradients[color]
          ? linearGradient(gradients[color].main, gradients[color].state)
          : linearGradient(gradients.dark.main, gradients.dark.state),
        boxShadow: xl,
        position: "relative",
        cursor: "pointer",
        overflow: "hidden"
      })}
    >
      <MDBox
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        sx={{
          backgroundImage: `url(${pattern})`,
          backgroundSize: "cover",
        }}
      />
      <MDBox position="relative" zIndex={2} p={2}>
        <MDBox color="white" lineHeight={0} display="inline-block">
          <MDBox component="img" src={`${process.env.REACT_APP_PUBLIC_URL}/${agency}`} alt="agency" width="25%" />
        </MDBox>
        <MDTypography variant="h5" color="white" fontWeight="medium" sx={{ mt: 1, mb: 1, pb: 1, textAlign: 'center', textShadow : '0px 1px 2px #343434' , letterSpacing: '6px' }}>
          {number}
        </MDTypography>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <MDBox display="flex" flexDirection="column">
            <MDBox mr={3} lineHeight={1}>
              <MDTypography variant="button" color="primary" fontWeight="regular" opacity={0.8}>
                {holderName}
              </MDTypography>
              <MDTypography
                variant="h6"
                color="primary"
                fontWeight="medium"
                textTransform="capitalize"
              >
                {holder}
              </MDTypography>
            </MDBox>
            <MDBox lineHeight={1}>
              <MDTypography variant="button" color="primary" fontWeight="regular" opacity={0.8}>
                Expires
              </MDTypography>
              <MDTypography variant="h6" color="primary" fontWeight="medium">
                {expires}
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox display="flex" justifyContent="flex-end" mt="auto" width="20%">
            <MDAvatar src={`${process.env.REACT_APP_PUBLIC_URL}/${company}`} alt="agency" size="lg" />
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Typechecking props for the MasterCard
MasterCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  number: PropTypes.number.isRequired,
  holder: PropTypes.string.isRequired,
  expires: PropTypes.string.isRequired,
  agency: PropTypes.string,
  company: PropTypes.string,
  holderName: PropTypes.string,
};

export default MasterCard;
