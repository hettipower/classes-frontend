import { useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import CustomerCell from "components/ICTableCell/CustomerCell";
import MDButton from "components/MDButton";

// Timeline context
import { useTimeline } from "services/Timeline/context";
import ListItem from "services/Items/ListItem";

// Custom styles for the TimelineItem
import timelineItem from "services/Timeline/TimelineItem/styles";
import Modal from "services/Modal";

import ICFancybox from "components/ICFancybox";

import { formattedDate, numberFormatter } from "functions/misc";

function TimelineItem({
  color = "info",
  icon,
  title,
  dateTime,
  description = "",
  lastItem = false,
  username,
  documents,
  additionalInfo,
  userimage,
  dataItem
}) {
  /* eslint-disable no-unused-vars */
  const [openModal, setOpenModal] = useState(false);
  const isDark = useTimeline();

  const handleModalClose = () => {
    setOpenModal(!openModal);
  }

  const renderInfo = additionalInfo && 
  (<MDBox mt={2}>
    {
      additionalInfo?.hospital_name &&
      <ListItem title="Hospital Name" description={additionalInfo?.hospital_name} sx={{ mb: -1 }} />
    }

    {
      additionalInfo?.room_number &&
      <ListItem title="Room Number" description={additionalInfo?.room_number} sx={{ mb: -1 }} />
    }

    {
      additionalInfo?.member_name &&
      <ListItem title="Patient name" description={additionalInfo?.member_name} sx={{ mb: -1 }} />
    }

    {
      additionalInfo?.contact_name &&
      <ListItem title="Guardian name" description={additionalInfo?.contact_name} sx={{ mb: -1 }} />
    }

    {
      additionalInfo?.contact_number &&
      <ListItem title="Contact Number" description={additionalInfo?.contact_number} sx={{ mb: -1 }} />
    }

    {
      additionalInfo?.bill_number &&
      <ListItem title="Bill Number" description={additionalInfo?.bill_number} />
    }

    {
      additionalInfo?.total_charges &&
      <ListItem title="Total Charges" description={numberFormatter(additionalInfo?.total_charges)} />
    }

    {
      additionalInfo?.gop_amount &&
      <ListItem title="GOP Amount" description={numberFormatter(additionalInfo?.gop_amount)} />
    }

    {
      additionalInfo?.balance_patient_payment &&
      <ListItem title="Balance to Paid by Patient" description={numberFormatter(additionalInfo?.balance_patient_payment)} />
    }
  </MDBox>);

  const renderInfoPop = dataItem && 
  (<MDBox mt={2} dangerouslySetInnerHTML={{__html: dataItem}} />);

  return (
    <MDBox position="relative" mb={3} sx={(theme) => timelineItem(theme, { lastItem, isDark })}>
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgColor={color}
        color="white"
        width="2rem"
        height="2rem"
        borderRadius="50%"
        position="absolute"
        top="15px"
        left="2px"
        zIndex={2}
        sx={{ fontSize: ({ typography: { size } }) => size.sm }}
      >
        <Icon fontSize="inherit">{icon}</Icon>
      </MDBox>
      <MDBox ml={5.75} pt={description ? 0.7 : 0.5} lineHeight={0} >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>

            {
              lastItem ?
              <>
                <MDBox mt={1}>
                  <MDTypography variant="button" fontWeight="medium" color={isDark ? "white" : "dark"}>
                    {title}
                  </MDTypography>
                </MDBox>
                <MDBox mt={0.5}>
                  <MDTypography variant="caption" color={isDark ? "secondary" : "text"}>
                    {formattedDate(dateTime)}
                  </MDTypography>
                </MDBox>
                <MDBox mt={2} mb={1}>
                  {username ? (
                    <CustomerCell image={`${process.env.REACT_APP_PUBLIC_URL}/${userimage}`} color="dark" name={username} />
                  ) : null}
                </MDBox>
                <MDBox mt={0} mb={1.5}>
                  {description ? (
                    <MDTypography variant="button" color={isDark ? "white" : "dark"}>
                      {description}
                    </MDTypography>
                  ) : null}
                </MDBox>
                {renderInfo}
                <Grid item xs={12} sm={12}>
                  {
                    ( documents && documents.length > 0 ) &&
                    <ICFancybox
                      options={{
                        Carousel: {
                          infinite: false,
                        },
                      }}
                      display="grid"
                      gridTemplateColumns="1fr 1fr 1fr 1fr 1fr 1fr"
                      gap="3px"
                    >
                      {
                        documents.map( item => <a style={{ width: `100%`, display: `inline-block` }} key={item} data-fancybox={title} href={`${process.env.REACT_APP_PUBLIC_URL}/${item}`}>
                          <MDAvatar src={`${process.env.REACT_APP_PUBLIC_URL}/${item}`} alt="Doc" variant="rounded" size="lg" />
                        </a> )
                      }
                    </ICFancybox>
                  }
                </Grid>

                {
                  dataItem &&
                  <MDButton
                    variant="gradient"
                    color="dark"
                    onClick={() => setOpenModal(!openModal)}
                  >
                    View GOP
                  </MDButton>
                }

              </>
              :
              <Accordion
                sx={{ boxShadow: 'unset', borderBottom: `1px solid #ddd` }}
                disableGutters={false}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <MDTypography variant="button" fontWeight="medium" color={isDark ? "white" : "dark"}>
                    {title}
                  </MDTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <MDBox mt={0.5}>
                    <MDTypography variant="caption" color={isDark ? "secondary" : "text"}>
                      {formattedDate(dateTime)}
                    </MDTypography>
                  </MDBox>
                  <MDBox mt={2} mb={1}>
                    {username ? (
                      <CustomerCell image={`${process.env.REACT_APP_PUBLIC_URL}/${userimage}`} color="dark" name={username} />
                    ) : null}
                  </MDBox>
                  <MDBox mt={0} mb={1.5}>
                    {description ? (
                      <MDTypography variant="button" color={isDark ? "white" : "dark"}>
                        {description}
                      </MDTypography>
                    ) : null}
                  </MDBox>
                  {renderInfo}
                  <Grid item xs={12} sm={12}>
                    {
                      ( documents && documents.length > 0 ) &&
                      <ICFancybox
                        options={{
                          Carousel: {
                            infinite: false,
                          },
                        }}
                        display="grid"
                        gridTemplateColumns="1fr 1fr 1fr 1fr 1fr 1fr"
                        gap="3px"
                      >
                        {
                          documents.map( item => <a style={{ width: `100%`, display: `inline-block` }} key={item} data-fancybox={title} href={`${process.env.REACT_APP_PUBLIC_URL}/${item}`}>
                            <MDAvatar src={`${process.env.REACT_APP_PUBLIC_URL}/${item}`} alt="Doc" variant="rounded" size="lg" />
                          </a> )
                        }
                      </ICFancybox>
                    }
                  </Grid>
                </AccordionDetails>
              </Accordion>
            }

          </Grid>
        </Grid>
      </MDBox>

      <Modal
        handleClose={handleModalClose}
        open={openModal}
        title="Acknowledge Payment"
      >
        <MDBox sx={{ overflowY: 'scroll', height: `calc(100vh - 200px)` }}>
          {renderInfoPop}
        </MDBox>
      </Modal>

    </MDBox>
  );
}

// Typechecking props for the TimelineItem
TimelineItem.propTypes = {
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
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  description: PropTypes.string,
  lastItem: PropTypes.bool,
  username: PropTypes.string,
  documents: PropTypes.instanceOf(Array),
  additionalInfo: PropTypes.instanceOf(Object),
  userimage: PropTypes.string,
  dataItem: PropTypes.string,
};

export default TimelineItem;
