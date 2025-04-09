export default {
  formId: "add-class-form",
  formField: {
    className: {
      name: "className",
      label: "Class Name",
      type: "text",
      errorMsg: "Class Name is required.",
    },
    teacher: {
      name: "teacher",
      label: "Teacher",
      errorMsg: "Teacher is required.",
    },
    subject: {
      name: "subject",
      label: "Subject",
      errorMsg: "Subject is required.",
    },
    registrationAmount: {
      name: "registrationAmount",
      label: "Registration Amount",
      type: "number",
      errorMsg: "Registration Amount is required.",
    },
    classFeeAmount: {
      name: "classFeeAmount",
      label: "Class Fee Amount",
      type: "number",
      errorMsg: "Class Fee Amount is required.",
    },
    commission: {
      name: "commission",
      label: "Commission",
      type: "number",
      errorMsg: "Commission is required.",
    }
  },
};
