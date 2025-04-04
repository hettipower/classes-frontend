import checkout from "layouts/teachers/schemas/form";

const {
  formField: { teacherName, email, contactNo, teachingSubject },
} = checkout;

export default {
  [teacherName.name]: "",
  [email.name]: "",
  [contactNo.name]: "",
  [teachingSubject.name]: "",
};
