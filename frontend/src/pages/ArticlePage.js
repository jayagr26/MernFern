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
import { useMutation, useQuery, useQueryClient } from "react-query";
import ArticleService from "../services/article.service";
import CreateArticleForm from "../components/CreateArticleForm";

const Article = () => {
  const [createForm, setCreateForm] = useState(false);
  const queryClient = useQueryClient();

  const { isLoading: isFetchingArticles, data: articles } = useQuery(
    "articles",
    ArticleService.getArticles,
    {
      enabled: true,
    }
  );

  const { isLoading: isCreatingArticle, mutate: postArticle } = useMutation(
    ({ title, article }) => ArticleService.createArticles({ title, article }),
    {
      // Todo: Handle error case
      onSuccess: () => {
        setCreateForm(false);
        queryClient.invalidateQueries({ queryKey: ["articles"] });
      },
    }
  );

  const { isLoading: isDeletingArticle, mutate: deleteArticle } = useMutation(
    (id) => ArticleService.deleteArticles({ id: id }),
    // Todo: Handle error case
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["articles"] });
      },
    }
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      {isFetchingArticles || isDeletingArticle ? (
        <CircularProgress className="center" />
      ) : createForm ? (
        <CreateArticleForm
          setCreateForm={setCreateForm}
          isCreatingArticle={isCreatingArticle}
          postArticle={postArticle}
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
              articles.map((item, index) => {
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
      )}
    </Box>
  );
};

export default Article;
