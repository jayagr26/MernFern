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
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import articleApiClient from "../services/article.service";
import CreateArticleForm from "../components/CreateArticleForm";

const Article = () => {
  const [createForm, setCreateForm] = useState(false);

  const {
    isLoading: isFetchingArticles,
    data: articles,
    refetch: refetchAllArticles,
  } = useQuery("fetch-articles", async () => {
    return await articleApiClient.get("/");
  });

  const { isLoading: isDeletingArticle, mutate: deleteArticle } = useMutation(
    (id) => {
      articleApiClient.delete(`/${id}`);
    },
    // Todo: Handle error case
    {
      onSuccess: () => refetchAllArticles(),
    }
  );

  return isFetchingArticles || isDeletingArticle ? (
    <CircularProgress className="center" />
  ) : createForm ? (
    <CreateArticleForm
      setCreateForm={setCreateForm}
      refetchAllArticles={refetchAllArticles}
    />
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
                <Card
                  raised
                  sx={{
                    width: "400px",
                    height: "300px",
                    display: "flex",
                    flexDirection: "column",
                    margin: "auto",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <h3>{item.title}</h3>
                    {item.article || ""}
                  </CardContent>
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        deleteArticle(item._id);
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
