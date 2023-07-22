import authJWT from "./authJWT.js";
import verifySignup from "./verifySignup.js";
import verifyLogin from "./verifyLogin.js";
import verifyUpdateUser from "../middlewares/verifyUpdateUser.js";

export default {
  verifySignup,
  verifyLogin,
  authJWT,
  verifyUpdateUser,
};
