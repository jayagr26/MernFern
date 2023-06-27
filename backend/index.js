import express from "express";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3002",
  })
);
const port = 3000;

app.get("/", (_, res) => {
  res.json({
    data: "hello World Earth Checking once more",
  });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
