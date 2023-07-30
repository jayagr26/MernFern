import axios from "axios";
import AuthHeader from "./auth-header.service";

const articleApiClient = axios.create({
  baseURL: "http://localhost:3000/api/v1/profile",
  headers: {
    ...AuthHeader(),
  },
});

const getProfile = async () => {
  return await articleApiClient
    .get("http://localhost:3000/api/v1/profile")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Error in fetching profile data!");
    });
};

const ProfileService = {
  getProfile,
};

export default ProfileService;
