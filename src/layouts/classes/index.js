// Otis Admin PRO React services components
import DashboardLayout from "services/LayoutContainers/DashboardLayout";
import DashboardNavbar from "services/Navbars/DashboardNavbar";
import Footer from "services/Footer";

// Otis Admin PRO React components
import MDBox from "components/MDBox";

function Classes() {
 
  return (
    <DashboardLayout>
      <DashboardNavbar showBack={false} />
      <MDBox py={3} mb={20} minHeight="50vh">
      Classes
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Classes;
