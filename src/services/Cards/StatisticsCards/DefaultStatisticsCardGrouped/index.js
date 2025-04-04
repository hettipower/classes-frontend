// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-router components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function DefaultStatisticsCardGrouped({ items, dashboardClass }) {

  const cardStyle = {
    backgroundColor: `${dashboardClass === 'green' ? '#cffdd1' : dashboardClass === 'red' && '#ffe0de'}`,
    border: `1px solid ${dashboardClass === 'green' ? '#4caf50' : dashboardClass === 'red' && '#f44336'}`,
  }

  const textStyle = {
    color: `${dashboardClass === 'green' ? '#509a5c' : dashboardClass === 'red' && '#c7225e'}`,
  }

  return (
    <Card sx={cardStyle}>
      <MDBox p={2}>
        <Grid container>
          {
            items.length > 0 &&
            items.map( item =>
              <Grid key={item.name} item xs={6}>
                {
                  item.clickable ?
                  <Link to={`/dashboard/details${item.params}`} style={{ display: 'block', height: '100%' }}>
                    <MDBox mb={0.5} lineHeight={1}>
                      <MDTypography
                        variant="button"
                        fontWeight="medium"
                        color="text"
                        textTransform="capitalize"
                      >
                        {item.name}
                      </MDTypography>
                    </MDBox>
                    <MDBox lineHeight={1} mb={1}>
                      <MDTypography variant="h5" fontWeight="bold" sx={textStyle}>
                        {item.value}
                      </MDTypography>
                    </MDBox>
                  </Link>
                  : 
                  <>
                    <MDBox mb={0.5} lineHeight={1}>
                      <MDTypography
                        variant="button"
                        fontWeight="medium"
                        color="text"
                        textTransform="capitalize"
                      >
                        {item.name}
                      </MDTypography>
                    </MDBox>
                    <MDBox lineHeight={1} mb={1}>
                      <MDTypography variant="h5" fontWeight="bold">
                        {item.value}
                      </MDTypography>
                    </MDBox>
                  </>
                }
              </Grid>
            )
          }
        </Grid>
      </MDBox>
    </Card>
  );
}

// Typechecking props for the DefaultStatisticsCardGrouped
DefaultStatisticsCardGrouped.propTypes = {
  items: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  dashboardClass: PropTypes.string,
};

export default DefaultStatisticsCardGrouped;
