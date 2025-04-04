// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Otis Admin PRO React components
import MDBox from "components/MDBox";

// Form components
import FormField from "components/ICFormField";


function NewSubject({ formData }) {
  /* eslint-disable no-unused-vars */
  const { formField, values, errors, touched } = formData;
  const { subjectName } = formField;
  const { 
    subjectName: subjectNameV,
  } = values;

  return (
    <MDBox>
      <MDBox>
        <Grid container spacing={3}>

          <Grid item xs={12} sm={12}>
            <FormField
              type={subjectName.type}
              label={subjectName.label}
              name={subjectName.name}
              value={subjectNameV}
              placeholder={subjectName.placeholder}
              error={errors.subjectName && touched.subjectName}
              success={subjectNameV.length > 0 && !errors.subjectName}
            />
          </Grid>

        </Grid>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for NewSubject
NewSubject.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default NewSubject;
