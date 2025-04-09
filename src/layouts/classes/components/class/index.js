import { useEffect, useState } from "react";

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Otis Admin PRO React components
import MDBox from "components/MDBox";

// Form components
import FormField from "components/ICFormField";
import AutocompleteField from "components/ICFormField/autocomplete";

// Authentication Functions
import { getLoginData } from "functions/auth";
import axiosInstance from 'functions/axiosConfig';


function NewClass({ formData }) {
  /* eslint-disable no-unused-vars */
  const { token } = getLoginData();
  const { formField, values, errors, touched, setFieldValue } = formData;
  const { className, teacher, subject, registrationAmount, classFeeAmount, commission } = formField;
  const { 
    className: classNameV, 
    teacher: teacherV, 
    subject: subjectV,
    registrationAmount: registrationAmountV, 
    classFeeAmount: classFeeAmountV, 
    commission: commissionV,
  } = values;
  const [subjects, setSubjects] = useState(false);
  const [teachers, setTeachers] = useState(false);

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
          response.data.data.map(async (item) => ({value: item.id, label: item.name}))
        );
  
        setTeachers(newTeachers);
      }
    } catch (error) {
      // console.log('Error:', error);
    }
  }; 

  useEffect(() => {
    fetchSubjects();
    fetchTeachers();
  }, []);

  return (
    <MDBox>
      <MDBox>
        <Grid container spacing={3}>

          <Grid item xs={12} sm={6}>
            <FormField
              type={className.type}
              label={className.label}
              name={className.name}
              value={classNameV}
              placeholder={className.placeholder}
              error={errors.className && touched.className}
              success={classNameV.length > 0 && !errors.className}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            {
              teachers.length > 0 && (
                <AutocompleteField
                  label={teacher.label}
                  name={teacher.name}
                  value={teacherV}
                  placeholder={teacher.placeholder}
                  error={errors.teacher && touched.teacher}
                  options={teachers}
                  setFieldValue={setFieldValue}
                />
              )
            }
          </Grid>

          <Grid item xs={12} sm={6}>
            {
              subjects.length > 0 && (
                <AutocompleteField
                  label={subject.label}
                  name={subject.name}
                  value={subjectV}
                  placeholder={subject.placeholder}
                  error={errors.subject && touched.subject}
                  options={subjects}
                  setFieldValue={setFieldValue}
                />
              )
            }
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormField
              type={registrationAmount.type}
              label={registrationAmount.label}
              name={registrationAmount.name}
              value={registrationAmountV}
              placeholder={registrationAmount.placeholder}
              error={errors.registrationAmount && touched.registrationAmount}
              success={registrationAmountV.length > 0 && !errors.registrationAmount}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormField
              type={classFeeAmount.type}
              label={classFeeAmount.label}
              name={classFeeAmount.name}
              value={classFeeAmountV}
              placeholder={classFeeAmount.placeholder}
              error={errors.classFeeAmount && touched.classFeeAmount}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormField
              type={commission.type}
              label={commission.label}
              name={commission.name}
              value={commissionV}
              placeholder={commission.placeholder}
              error={errors.commission && touched.commission}
            />
          </Grid>

        </Grid>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for NewClass
NewClass.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default NewClass;
