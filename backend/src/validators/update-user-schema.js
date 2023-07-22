import * as yup from "yup";

const validationSchema = yup.object({
  username: yup.string().max(20, "Usernmae can be max 20 characters"),
  email: yup.string().email(),
  password: yup
    .string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

export default validationSchema;
