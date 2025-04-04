import { useEffect, useState, useRef } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Skeleton from '@mui/material/Skeleton';

// react-router components
import { Link } from "react-router-dom";

// Otis Admin PRO React services components
import DashboardLayout from "services/LayoutContainers/DashboardLayout";
import DashboardNavbar from "services/Navbars/DashboardNavbar";
import Footer from "services/Footer";
import DataTable from "services/Tables/DataTable";

// Data
import teachersData from "layouts/teachers/data/teachersData";

// Authentication Functions
import { getLoginData } from "functions/auth";
import axiosInstance from 'functions/axiosConfig';

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

function Teachers() {

  /* eslint-disable no-unused-vars */
  const { token } = getLoginData();
  const [teachers, setTeachers] = useState(false);
  const targetRef = useRef(null);

  const fetchTeachers = async () => {
    try {
      const response = await axiosInstance.get(`/teachers/all`, {
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.data.length > 0) {
        // Use Promise.all to await all corporate name fetches
        const newTeachers = await Promise.all(
          response.data.data.map(async (item) => ({
            teachersName: item.name,
            email: item.email,
            contactNo: item.contactNo,
            actions: []
          }))
        );
  
        setTeachers(newTeachers);
      }
    } catch (error) {
      // console.log('Error:', error);
    }
  }; 

  useEffect(() => {
    fetchTeachers();
  }, []);

  teachersData.rows = teachers;
 
  return (
    <DashboardLayout>
      <DashboardNavbar showBack={false} />
      <MDBox py={3} mb={20} minHeight="50vh">
        <MDBox display="flex" justifyContent="flex-start" alignItems="flex-start" mb={2}>
          <MDButton variant="gradient" color="info" style={{ marginRight: `10px` , padding: 0 }}>
            <Link to="/teachers/add-teacher" style={{ color: `#ffffff`, padding: `0.5625rem 1.5rem` }}>
              add teacher
            </Link>
          </MDButton>
        </MDBox>
        <Card ref={targetRef}>
          {
            teachers ?
            <DataTable table={teachersData} entriesPerPage={false} canSearch isSorted={false} />
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

export default Teachers;
