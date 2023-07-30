import axios from "axios";
import AuthHeader from "./auth-header.service";

const articleApiClient = axios.create({
  baseURL: "http://localhost:3000/api/v1/articles",
  headers: {
    ...AuthHeader(),
  },
});

const getArticles = async () => {
  return await articleApiClient
    .get("/")
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      throw new Error(err.response.data.message || "Error Fetching Articles");
    });
};

const createArticles = async ({ title, article }) => {
  return await articleApiClient
    .post(
      "/",
      { title, article },
      {
        headers: {
          ...articleApiClient.defaults.headers,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      throw new Error(err.response.data.message || "Error Creating Article");
    });
};

const deleteArticles = async ({ id }) => {
  return await articleApiClient
    .delete("/" + id)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
      throw new Error(err.response.data.message || "Error Deleting Article");
    });
};

const ArticleService = { getArticles, createArticles, deleteArticles };

export default ArticleService;
