import * as yup from "yup";

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("No password provided")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

export default validationSchema;
