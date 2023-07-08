import cors from "cors";
import express from "express";
import "./loadenvironment.js";
import authJWT from "./middlewares/authJWT.js";
import articles from "./routes/articles.js";
import authRoutes from "./routes/auth-route.js";

const PORT = 3000;
const app = express();
const API_PATH_WITH_VERSION = "/api/v1";

// middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON payload" });
  }
  next(err);
});

const headersMiddleware = (_, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
};

// routes
app.use(API_PATH_WITH_VERSION + "/auth", authRoutes);

app.use(headersMiddleware);
app.use(authJWT.verifyToken);

app.get(API_PATH_WITH_VERSION + "/", (_, res) => {
  res.json({
    data: "Hello World!!",
  });
});

app.use(API_PATH_WITH_VERSION + "/articles", articles);

app.use((err, _, res) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
