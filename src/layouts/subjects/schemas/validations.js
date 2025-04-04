import * as Yup from "yup";
import checkout from "layouts/subjects/schemas/form";

const {
  formField: { subjectName },
} = checkout;

export default Yup.object().shape({
  [subjectName.name]: Yup.string().required(subjectName.errorMsg),
});
