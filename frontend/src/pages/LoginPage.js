import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("No password provided"),
});

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {},
  });
  return (
    <Box sx={{ width: "500px" }}>
      <form className="form" onSubmit={formik.handleSubmit}>
        <Typography variant="h5" sx={{ m: 2 }}>
          Log In
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
        <Button
          variant="contained"
          type="submit"
          sx={{ m: "10px", alignSelf: "center" }}
        >
          Login
        </Button>
        <Typography
          variant="h15"
          sx={{ mt: "25px", m: "8px", alignSelf: "center" }}
        >
          {"New to MernFern? "}
          <Link component={RouterLink} to={"/signup"} underline="none" href="">
            Join now
          </Link>
        </Typography>
      </form>
    </Box>
  );
};

export default Login;
