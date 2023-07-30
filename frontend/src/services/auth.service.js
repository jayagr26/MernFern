import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/auth";

const login = async ({ username, password }) => {
  const payload = { username, password };

  return await axios
    .post(API_URL + "/login", payload)
    .then((res) => {
      if (res.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.response.data.message || "Login error");
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const register = async ({ username, email, password }) => {
  const payload = { username, email, password };

  return await axios
    .post(API_URL + "/signup", payload)
    .then((res) => {
      login({ username, password });
      return res.data;
    })
    .catch((err) => {
      throw new Error(err.response.data.message || "Registration error");
    });
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
