import * as yup from "yup";

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
    .required("No password provided"),
});

export default validationSchema;
