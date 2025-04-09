import { useEffect, useState } from "react";

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Otis Admin PRO React components
import MDBox from "components/MDBox";

// Form components
import FormField from "components/ICFormField";
import AutocompleteMultipleField from "components/ICFormField/autocompleteMultiple";

// Authentication Functions
import { getLoginData } from "functions/auth";
import axiosInstance from 'functions/axiosConfig';


function NewTeacher({ formData }) {
  /* eslint-disable no-unused-vars */
  const { token } = getLoginData();
  const { formField, values, errors, touched, setFieldValue } = formData;
  const { teacherName, email, contactNo, teachingSubject } = formField;
  const { 
    teacherName: teacherNameV, 
    email: emailV, 
    contactNo: contactNoV, 
    teachingSubject: teachingSubjectV,
  } = values;
  const [subjects, setSubjects] = useState(false);

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
          response.data.data.map(async (item) => ({value: item.subject_id, label: item.subject_name}))
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

  return (
    <MDBox>
      <MDBox>
        <Grid container spacing={3}>

          <Grid item xs={12} sm={6}>
            <FormField
              type={teacherName.type}
              label={teacherName.label}
              name={teacherName.name}
              value={teacherNameV}
              placeholder={teacherName.placeholder}
              error={errors.teacherName && touched.teacherName}
              success={teacherNameV.length > 0 && !errors.teacherName}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormField
              type={email.type}
              label={email.label}
              name={email.name}
              value={emailV}
              placeholder={email.placeholder}
              error={errors.email && touched.email}
              success={emailV.length > 0 && !errors.email}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormField
              type={contactNo.type}
              label={contactNo.label}
              name={contactNo.name}
              value={contactNoV}
              placeholder={contactNo.placeholder}
              error={errors.contactNo && touched.contactNo}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            {
              subjects.length > 0 && (
                <AutocompleteMultipleField
                  label={teachingSubject.label}
                  name={teachingSubject.name}
                  value={teachingSubjectV}
                  placeholder={teachingSubject.placeholder}
                  error={errors.teachingSubject && touched.teachingSubject}
                  options={subjects}
                  setFieldValue={setFieldValue}
                />
              )
            }
          </Grid>

        </Grid>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for NewTeacher
NewTeacher.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default NewTeacher;
