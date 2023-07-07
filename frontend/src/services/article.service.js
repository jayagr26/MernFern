import axios from "axios";

const articleApiClient = axios.create({
  baseURL: "http://localhost:3000/api/v1/articles",
  headers: {
    "Content-Type": "application-type/json",
  },
});

export default articleApiClient;
