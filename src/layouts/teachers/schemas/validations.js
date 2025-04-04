import * as Yup from "yup";
import checkout from "layouts/teachers/schemas/form";

const {
  formField: { teacherName, email, contactNo },
} = checkout;

export default Yup.object().shape({
  [teacherName.name]: Yup.string().required(teacherName.errorMsg),
  [contactNo.name]: Yup.string()
    .required(contactNo.errorMsg)
    .matches(/^[0-9]+$/, "Only numeric values are allowed")
    .min(8, "Contact number must be at least 10 digits")
    .max(8, "Contact number must not exceed 10 digits"),
  [email.name]: Yup.string().required(email.errorMsg).email(email.invalidMsg),
});
