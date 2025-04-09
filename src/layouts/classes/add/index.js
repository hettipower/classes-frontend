// formik components
import { Formik, Form } from "formik";

// react-router-dom components
// import { useNavigate, useSearchParams } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Otis Admin PRO React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// Otis Admin PRO React services components
import DashboardLayout from "services/LayoutContainers/DashboardLayout";
import DashboardNavbar from "services/Navbars/DashboardNavbar";
import Footer from "services/Footer";

// forms components
import NewClass from "layouts/classes/components/class";

// layout schemas for form and form feilds
import validations from "layouts/classes/schemas/validations";
import form from "layouts/classes/schemas/form";
import initialValues from "layouts/classes/schemas/initialValues";

// Authentication Functions
import { getLoginData } from "functions/auth";
import axiosInstance from 'functions/axiosConfig';

// Notifications
import { useNotification } from 'context/notificationContext';

function AddClass() {
  /* eslint-disable no-unused-vars */
  const { addNotification } = useNotification();
  const { formId, formField } = form;
  const { token } = getLoginData();

  const submitForm = async (values, actions) => {

    const data = {
      class_name: values.className,
      teacher: values.teacher,
      subject: values.subject,
      registrationAmount: values.registrationAmount,
      classFeeAmount: values.classFeeAmount,
      commission: values.commission,
    };

    axiosInstance.post(`/classes/create`, data , {
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      if( response.data.status ) {
        addNotification(response.data.message, 'success');
        actions.resetForm();
      } else {
        addNotification(response.data.message, 'error');
      }
    })
    .catch((err) => {
      addNotification(err?.response?.data?.message, 'error');
    });

    actions.setSubmitting(false);
  };

  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar title="New Class"/>
      <MDBox py={3} mb={20} minHeight="50vh">
        <Grid container justifyContent="center" alignItems="center" sx={{ height: "100%", mt: 8 }}>
          <Grid item xs={12} lg={8}>
            <Formik
              initialValues={initialValues}
              validationSchema={validations}
              enableReinitialize
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                <Form id={formId} autoComplete="off">
                  <Card sx={{ height: "100%" }}>
                    <MDBox p={3}>
                      <MDBox>
                        <NewClass formData={{
                          values,
                          touched,
                          formField,
                          errors,
                          setFieldValue
                        }} />
                        <MDBox mt={2} width="100%" display="flex" justifyContent="flex-end">
                          <MDButton
                            disabled={isSubmitting}
                            type="submit"
                            variant="gradient"
                            color="dark"
                          >
                            Save
                          </MDButton>
                        </MDBox>
                      </MDBox>
                    </MDBox>
                  </Card>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AddClass;
