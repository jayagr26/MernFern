import express from "express";
import { login, signup } from "../auth.js";
import middlewares from "../middlewares/index.js";

const router = express.Router();

router.post(
  "/signup",
  [
    middlewares.verifySignup.validateData,
    middlewares.verifySignup.checkDuplicateUsernameOrEmail,
  ],
  signup
);

router.post("/login", [middlewares.verifyLogin.validateData], login);

export default router;
