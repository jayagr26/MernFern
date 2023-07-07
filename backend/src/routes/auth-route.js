import verifySignup from "../middlewares/verifySignup.js";
import { signup, login } from "../auth.js";
import express from "express";

const router = express.Router();

router.use((_, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/signup", [verifySignup.checkDuplicateUsernameOrEmail], signup);

router.post("/login", login);

export default router;
