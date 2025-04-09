import { useEffect, useState, useRef } from "react";

// react-router components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Skeleton from '@mui/material/Skeleton';

// Otis Admin PRO React services components
import DashboardLayout from "services/LayoutContainers/DashboardLayout";
import DashboardNavbar from "services/Navbars/DashboardNavbar";
import Footer from "services/Footer";
import DataTable from "services/Tables/DataTable";

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// Data
import classesData from "layouts/classes/data/classesData";

// Authentication Functions
import { getLoginData } from "functions/auth";
import axiosInstance from 'functions/axiosConfig';

function Classes() {

  /* eslint-disable no-unused-vars */
  const { token } = getLoginData();
  const [classes, setClasses] = useState(false);
  const targetRef = useRef(null);

  const fetchClasses = async () => {
    try {
      const response = await axiosInstance.get(`/classes/all`, {
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.data.length > 0) {
        // Use Promise.all to await all corporate name fetches
        console.log(response.data.data)
        const newClasses = await Promise.all(
          response.data.data.map(async (item) => ({
            className: item.class_name,
            teacher: item.teacher.name,
            actions: []
          }))
        );
  
        setClasses(newClasses);
      }
    } catch (error) {
      // console.log('Error:', error);
    }
  }; 

  useEffect(() => {
    fetchClasses();
  }, []);

  classesData.rows = classes;
 
  return (
    <DashboardLayout>
      <DashboardNavbar showBack={false} />
      <MDBox py={3} mb={20} minHeight="50vh">
        <MDBox display="flex" justifyContent="flex-start" alignItems="flex-start" mb={2}>
          <MDButton variant="gradient" color="info" style={{ marginRight: `10px` , padding: 0 }}>
            <Link to="/classes/add-class" style={{ color: `#ffffff`, padding: `0.5625rem 1.5rem` }}>
              add class
            </Link>
          </MDButton>
        </MDBox>
        <Card ref={targetRef}>
          {
            classes ?
            <DataTable table={classesData} entriesPerPage={false} canSearch isSorted={false} />
            :
            <Grid container px={2} spacing={2}>
              <Grid item xs={12} md={6} lg={3}>
                <Skeleton height={50} />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Skeleton height={50} />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Skeleton height={50} />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <Skeleton height={50} />
              </Grid>
            </Grid>
          }
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Classes;
