import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/auth";

const AuthService = () => {
  const login = async ({ username, password }) => {
    const payload = {
      username: username,
      password: password,
    };
    return await axios.post(API_URL + "signin", payload).then((res) => {
      if (res.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(res.data));
      }
      return res.data;
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
  };

  const register = async ({ username, email, password }) => {
    const payload = {
      username: username,
      password: password,
      email: email,
    };
    return await axios.post(API_URL + "signup", payload);
  };

  const getCurrentUser = () => {
    return localStorage.getItem("user");
  };
};

export default AuthService;
