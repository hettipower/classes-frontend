// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// react-router components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Custom styles for ComplexCompanyCard
function ComplexCompanyCard({
  color = "dark",
  image,
  title,
  contact,
  address,
  corporates,
  link
}) {

  const renderCorporates = corporates.length > 0 && corporates.map(corporate => (
    <MDAvatar
      key={corporate.corporate_id}
      src={`${process.env.REACT_APP_PUBLIC_URL}/${corporate.logo}`}
      alt="corporate profile"
      size="xs"
      sx={({ borders: { borderWidth }, palette: { white } }) => ({
        border: `${borderWidth[2]} solid ${white.main}`,
        cursor: "pointer",
        position: "relative",

        "&:not(:first-of-type)": {
          ml: -1.25,
        },

        "&:hover, &:focus": {
          zIndex: "10",
        },
      })}
    />
  ));

  return (
    <Card>
      <Link 
        to={link}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          zIndex: 10
        }}
      />
      <MDBox p={2}>
        <MDBox display="flex" alignItems="center">
          <MDAvatar
            src={image}
            alt={title}
            size="xl"
            variant="rounded"
            bgColor={color}
            sx={{ p: 0, mt: -6, borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl }}
          />
          <MDBox ml={2} mt={-2} lineHeight={0}>
            <MDTypography variant="h6" textTransform="capitalize" fontWeight="medium">
              {title}
            </MDTypography>
            {corporates.length > 0 ? <MDBox display="flex">{renderCorporates}</MDBox> : null}
          </MDBox>
        </MDBox>
        <MDBox my={2} lineHeight={1}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {contact}
          </MDTypography>
        </MDBox>
        <MDBox my={2} lineHeight={1}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {address}
          </MDTypography>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Typechecking props for the ProfileInfoCard
ComplexCompanyCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  contact: PropTypes.node.isRequired,
  address: PropTypes.node.isRequired,
  corporates: PropTypes.node,
  link: PropTypes.node.isRequired,
};

export default ComplexCompanyCard;
