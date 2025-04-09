import * as Yup from "yup";
import checkout from "layouts/classes/schemas/form";

const {
  formField: { className, teacher, subject, registrationAmount, classFeeAmount, commission },
} = checkout;

export default Yup.object().shape({
  [className.name]: Yup.string().required(className.errorMsg),
  [teacher.name]: Yup.string().required(teacher.errorMsg),
  [subject.name]: Yup.string().required(subject.errorMsg),
  [registrationAmount.name]: Yup.number().required(registrationAmount.errorMsg),
  [classFeeAmount.name]: Yup.number().required(classFeeAmount.errorMsg),
  [commission.name]: Yup.number().required(commission.errorMsg),
});
