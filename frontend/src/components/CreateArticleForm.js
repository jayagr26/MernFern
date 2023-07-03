import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import * as yup from "yup";
import "../App.css";
import apiClient from "../api";
import { CircularProgress } from "@mui/material";

const validationSchema = yup.object({
  title: yup
    .string("Enter your title")
    .max(50, "Title can be max 50 characters")
    .required("title is required"),
  article: yup.string("Enter your article").required("Article is required"),
});

const CreateArticleForm = ({ setCreateForm, refetchAllArticles }) => {
  const { isLoading: isCreatingArticle, mutate: postArticle } = useMutation(
    async (values) => {
      const payload = {
        title: values.title,
        article: values.article,
      };
      return await apiClient.post(`/articles`, payload, {
        headers: { "Content-Type": "application/json" },
      });
    },
    {
      // Todo: Handle error case
      onSuccess: () => {
        setCreateForm(false);
        refetchAllArticles();
      },
    }
  );

  const formik = useFormik({
    initialValues: { title: "", article: "" },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      postArticle(values);
    },
  });

  return (
    <div>
      {isCreatingArticle ? (
        <CircularProgress className="center" />
      ) : (
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={() => setCreateForm(false)}>Cancel</Button>
            <Button raised variant="contained" type="submit" sx={{ m: "10px" }}>
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default CreateArticleForm;
