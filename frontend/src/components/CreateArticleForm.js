import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import "../App.css";

const validationSchema = yup.object({
  title: yup
    .string("Enter your title")
    .max(10, "Title can be max 10 characters")
    .required("title is required"),
  article: yup.string("Enter your article").required("Article is required"),
});

const CreateArticleForm = ({ setCreateForm }) => {
  const formik = useFormik({
    initialValues: { title: "", article: "" },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      return setCreateForm(false);
    },
  });

  return (
    <div>
      <form className="form" onSubmit={formik.handleSubmit}>
        <Typography variant="h5" sx={{ m: 2 }}>
          Create Article
        </Typography>
        <TextField
          sx={{ m: "5px" }}
          id="title"
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          sx={{ m: "5px" }}
          id="article"
          name="article"
          label="Article"
          value={formik.values.article}
          onChange={formik.handleChange}
          error={formik.touched.article && Boolean(formik.errors.article)}
          helperText={formik.touched.article && formik.errors.article}
        />
        <Button
          raised
          variant="contained"
          type="submit"
          sx={{ alignSelf: "center", m: "10px" }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateArticleForm;
