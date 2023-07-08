import * as yup from "yup";

const validationSchema = yup.object({
  username: yup
    .string()
    .max(20, "Usernmae can be max 20 characters")
    .required("Username is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("No password provided")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

export default validationSchema;
