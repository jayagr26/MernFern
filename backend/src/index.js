import cors from "cors";
import express from "express";
import "./loadenvironment.js";
import authJWT from "./middlewares/authJWT.js";
import articles from "./routes/articles.js";
import authRoutes from "./routes/auth-route.js";

const PORT = 3000;
const app = express();

// middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const API_PATH_WITH_VERSION = "/api/v1";

// routes
app.get(API_PATH_WITH_VERSION + "/", (_, res) => {
  res.json({
    data: "Hello World!!",
  });
});

app.use(API_PATH_WITH_VERSION + "/auth", authRoutes);

app.use(API_PATH_WITH_VERSION + "/articles", [authJWT.verifyToken], articles);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
