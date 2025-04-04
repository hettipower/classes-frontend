import { useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-router components
import { Link, useSearchParams } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import ReportPopup from "layouts/reports/components/reportPopup";

function DefaultStatisticsCard({ title, count, clickable, params, dashboardClass }) {

  /* eslint-disable no-unused-vars */
  const [openModal, setOpenModal] = useState(false);
  const containsWidgetTS = params && params.includes('widget=TS');
  const [searchParams] = useSearchParams();
  const company = searchParams.get('company') ? searchParams.get('company') : '';
  const hideCompany = true;
  const closeModal = true;

  const handleModalClose = () => {
    setOpenModal(!openModal);
  }

  const textStyle = {
    color: `${dashboardClass === 'green' ? '#509a5c' : dashboardClass === 'red' && '#c7225e'}`,
  }

  const cardDetails = (<>
    <MDBox mb={0.5} lineHeight={1}>
      <MDTypography
        variant="button"
        fontWeight="medium"
        color="text"
        textTransform="capitalize"
      >
        {title}
      </MDTypography>
    </MDBox>
    <MDBox lineHeight={1}>
      <MDTypography variant="h5" fontWeight="bold" sx={textStyle}>
        {count}
      </MDTypography>
    </MDBox>
  </>);

  const cardStyle = {
    // backgroundColor: `${dashboardClass === 'green' ? '#cffdd1' : dashboardClass === 'red' && '#ffe0de'}`,
    border: `1px solid ${dashboardClass === 'green' ? '#4caf50' : dashboardClass === 'red' && '#f44336'}`,
  }

  return (
    <Card sx={cardStyle}>
      <MDBox p={2}>
        <Grid container>
          <Grid item xs={12}>

            {
              (clickable && !containsWidgetTS) &&
              <Link to={`/dashboard/details${params}`} style={{ display: 'block', height: '100%' }}>
                {cardDetails}
              </Link>
            }

            {
              (clickable && containsWidgetTS) &&
              <MDBox sx={{ position: 'relative' }}>
                <MDBox onClick={() => setOpenModal(!openModal)} sx={{ cursor: 'pointer'}}>
                  {cardDetails}
                </MDBox>
                <ReportPopup
                  openModal={openModal}
                  type="SettlementSavings"
                  title="Settlement Savings"
                  handleModalClose={handleModalClose}
                  company={company}
                  hideCompany={hideCompany}
                  closeModal={closeModal}
                />
              </MDBox>
            }

            {
              (!clickable) &&
              cardDetails
            }
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

// Typechecking props for the DefaultStatisticsCard
DefaultStatisticsCard.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  clickable: PropTypes.bool,
  params: PropTypes.string,
  dashboardClass: PropTypes.string,
};

export default DefaultStatisticsCard;
