import axios from "axios";
import { queryClient } from "../App";

const API_URL = "http://localhost:3000/api/v1/auth";

const login = async ({ username, password }) => {
  try {
    const payload = {
      username: username,
      password: password,
    };
    const response = await axios
      .post(API_URL + "/login", payload)
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        return res.data;
      });
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message || "Login error");
  }
};

const logout = () => {
  localStorage.removeItem("user");
  queryClient.clear();
  queryClient.removeQueries();
};

const register = async ({ username, email, password }) => {
  try {
    const payload = {
      username: username,
      password: password,
      email: email,
    };
    const response = await axios.post(API_URL + "/signup", payload);
    login({ username, password });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message || "Registration error");
  }
};

const getCurrentUser = () => {
  return localStorage.getItem("user");
};

const AuthService = {
  login,
  register,
  logout,
  getCurrentUser,
};
export default AuthService;
