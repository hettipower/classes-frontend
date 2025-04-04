import checkout from "layouts/subjects/schemas/form";

const {
  formField: { subjectName },
} = checkout;

export default {
  [subjectName.name]: "",
};
