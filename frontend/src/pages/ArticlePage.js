import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import { useMutation, useQuery } from "react-query";
import apiClient from "../api";
import { useState } from "react";
import CreateArticleForm from "../components/CreateArticleForm";

const Article = () => {
  const [createForm, setCreateForm] = useState(false);

  const {
    isLoading: isFetchingArticles,
    data: articles,
    refetch: refetchAllArticles,
  } = useQuery(
    "fetch-articles",
    async () => {
      return await apiClient.get("/articles");
    },
    {
      enabled: false,
      retry: 1,
    }
  );

  const { isLoading: isDeletingArticle, mutate: deleteArticle } = useMutation(
    (id) => apiClient.delete(`/articles/${id}`)
  );

  return isFetchingArticles ? (
    <CircularProgress className="center" />
  ) : createForm ? (
    <CreateArticleForm setCreateForm={setCreateForm} />
  ) : (
    <Box>
      <Box
        sx={{
          p: "50px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button variant="contained" sx={{ m: 2 }} onClick={refetchAllArticles}>
          Fetch
        </Button>
        <Button
          variant="contained"
          sx={{ m: 2 }}
          onClick={() => setCreateForm(true)}
        >
          Create
        </Button>
      </Box>
      <Grid container>
        {articles &&
          articles.data.map((item, index) => {
            return (
              <Grid item xs={12} sm={6} key={index} sx={{ p: "5px" }}>
                <Card raised>
                  <CardContent>{item.description || ""}</CardContent>
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        deleteArticle(item._id);
                        refetchAllArticles();
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

export default Article;
