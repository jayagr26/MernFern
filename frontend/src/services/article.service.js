import axios from "axios";
import AuthHeader from "../auth-header";

const articleApiClient = axios.create({
  baseURL: "http://localhost:3000/api/v1/articles",
  headers: {
    "Content-Type": "application-type/json",
    ...AuthHeader(),
  },
});

export default articleApiClient;
