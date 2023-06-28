import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { createDataSchema } from "./validators/create-data-schema.js";
import { updateDataSchema } from "./validators/update-data-schema.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3002",
  })
);
app.use(bodyParser.json());
const port = 3000;

app.get("/", (_, res) => {
  res.json({
    data: "Hello World!!",
  });
});

var data = [{ id: 1, name: "Lost" }];

app.post("/data", (req, res) => {
  const id = data.length;
  const { body } = req;

  try {
    const newData = createDataSchema.validateSync({
      id: id + 1,
      name: body.name,
    });
    data.push(newData);
    res.json(data);
  } catch (e) {
    res.status(422).json({ error: e.errors });
  }
});

app.get("/data", (_, res) => {
  res.json(data);
});

app.put("/data/:id", (req, res) => {
  const id = Number(req.params.id);
  const { body } = req;

  try {
    if (data.filter((obj) => obj.id === id).length === 0)
      throw { errors: "ID not present. Invalid ID" };
    const newData = updateDataSchema.validateSync({
      id: id,
      name: body.name,
    });
    data = data.map((obj) => {
      if (obj.id === id) {
        console.log("found");
        return newData;
      } else {
        return obj;
      }
    });

    res.json(data);
  } catch (e) {
    res.status(422).json({ error: e.errors });
  }
});

app.delete("/data/:id", (req, res) => {
  const id = Number(req.params.id);
  try {
    if (data.filter((obj) => obj.id === id).length === 0)
      throw { errors: "ID not present. Invalid ID" };
    data = data.filter((i) => i.id !== id);
    res.json(data);
  } catch (e) {
    res.status(422).json({ error: e.errors });
  }
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
