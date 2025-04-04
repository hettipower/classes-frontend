export default {
  formId: "add-teacher-form",
  formField: {
    teacherName: {
      name: "teacherName",
      label: "Teacher Name",
      type: "text",
      errorMsg: "Teacher Name is required.",
    },
    email: {
      name: "email",
      label: "Email",
      type: "email",
      errorMsg: "Email is required.",
      invalidMsg: "Email is not valid.",
    },
    contactNo: {
      name: "phone",
      label: "Phone",
      type: "tel",
      errorMsg: "Phone is required.",
    },
    teachingSubject: {
      name: "teachingSubject",
      label: "Teaching Subject",
      type: "Teaching Subject",
      errorMsg: "Teaching Subject is required.",
    },
  },
};
