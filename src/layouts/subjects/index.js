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

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// Data
import subjectsData from "layouts/subjects/data/subjectsData";

// Authentication Functions
import { getLoginData } from "functions/auth";
import axiosInstance from 'functions/axiosConfig';

function Subjects() {

  /* eslint-disable no-unused-vars */
  const { token } = getLoginData();
  const [subjects, setSubjects] = useState(false);
  const targetRef = useRef(null);

  const fetchSubjects = async () => {
    try {
      const response = await axiosInstance.get(`/subjects/all`, {
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.data.length > 0) {
        // Use Promise.all to await all corporate name fetches
        const newSubjects = await Promise.all(
          response.data.data.map(async (item) => ({
            subject: item.subject_name,
            actions: []
          }))
        );
  
        setSubjects(newSubjects);
      }
    } catch (error) {
      // console.log('Error:', error);
    }
  }; 

  useEffect(() => {
    fetchSubjects();
  }, []);

  subjectsData.rows = subjects;
 
  return (
    <DashboardLayout>
      <DashboardNavbar showBack={false} />
      <MDBox py={3} mb={20} minHeight="50vh">
        <MDBox display="flex" justifyContent="flex-start" alignItems="flex-start" mb={2}>
          <MDButton variant="gradient" color="info" style={{ marginRight: `10px` , padding: 0 }}>
            <Link to="/subjects/add-subject" style={{ color: `#ffffff`, padding: `0.5625rem 1.5rem` }}>
              add subject
            </Link>
          </MDButton>
        </MDBox>
        <Card ref={targetRef}>
          {
            subjects ?
            <DataTable table={subjectsData} entriesPerPage={false} canSearch isSorted={false} />
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

export default Subjects;
