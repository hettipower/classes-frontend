import checkout from "layouts/classes/schemas/form";

const {
  formField: { className, teacher, subject, registrationAmount, classFeeAmount, commission },
} = checkout;

export default {
  [className.name]: "",
  [teacher.name]: "",
  [subject.name]: "",
  [registrationAmount.name]: "",
  [classFeeAmount.name]: "",
  [commission.name]: "",
};
