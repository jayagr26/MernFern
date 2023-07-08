import LockIcon from "@mui/icons-material/Lock";
import {
  Box,
  Button,
  CircularProgress,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import "../App.css";
import authServiceApiClient from "../services/auth.service";
import { useContext, useEffect } from "react";
import { UserContext } from "../App";

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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match")
    .required("Password is required"),
});

const Signup = () => {
  const navigate = useNavigate();
  const { loggedin, setLoggedIn } = useContext(UserContext);

  useEffect(() => {
    if (loggedin) {
      navigate("/");
    }
  }, [loggedin]);

  const { isLoading: isRegisteringUser, mutate: registerUser } = useMutation(
    ({ username, email, password }) =>
      authServiceApiClient.register({ username, email, password }),
    {
      onSuccess: () => {
        navigate("/");
        setLoggedIn(true);
      },
      onError: (err) => alert(err.message),
    }
  );

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      registerUser({
        username: values.username,
        password: values.password,
        email: values.email,
      });
    },
  });

  return (
    <Box
      sx={{
        width: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isRegisteringUser ? (
        <CircularProgress />
      ) : (
        <form className="form" onSubmit={formik.handleSubmit}>
          <Typography variant="h5" sx={{ m: 2 }}>
            Sign Up
          </Typography>
          <TextField
            sx={{ m: "5px" }}
            id="username"
            name="username"
            label="Username"
            placeholder="Enter username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            sx={{ m: "5px" }}
            id="email"
            name="email"
            label="Email"
            placeholder="Enter email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            sx={{ m: "5px" }}
            id="password"
            name="password"
            label="Password"
            placeholder="Enter Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            sx={{ m: "5px" }}
            id="confirm-password"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ m: "10px", alignSelf: "center" }}
            startIcon={<LockIcon />}
          >
            Create Account
          </Button>

          <Typography
            variant="h15"
            sx={{ mt: "25px", m: "8px", alignSelf: "center" }}
          >
            {"Already a member? "}
            <Link component={RouterLink} to={"/login"} underline="none" href="">
              Log in
            </Link>
          </Typography>
        </form>
      )}
    </Box>
  );
};

export default Signup;
