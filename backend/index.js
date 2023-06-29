import express from "express";
import "./loadenvironment.js";
import cors from "cors";
import articles from "./routes/articles.js";

const PORT = 3000;
const app = express();

// middleware
app.use(
  cors({
    origin: "http://localhost:3002",
  })
);
app.use(express.json());

// routes
app.get("/", (_, res) => {
  res.json({
    data: "Hello World!!",
  });
});

app.use("/articles", articles);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
