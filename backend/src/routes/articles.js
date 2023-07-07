import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "bson";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const collection = db.collection("articles");
    const results = await collection.find({}).toArray();
    res.send(results).status(200);
  } catch (err) {
    console.log("Error fetching articles: ", err);
    res.status(500).send("Interval Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const collection = db.collection("articles");

    // Todo: input data validation remaining
    const { body } = req;
    console.log(body);
    const result = await collection.insertOne(body);
    res.send(result).status(200);
  } catch (err) {
    console.log("Error creating article: ", err);
    res.status(500).send("Interval Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const collection = db.collection("articles");
    const articleId = req.params.id;

    if (!ObjectId.isValid(articleId)) {
      res.status(400).send("Invalid article ID");
      return;
    }

    const article = await collection.findOne({ _id: new ObjectId(articleId) });
    if (!article) {
      res.send("Article not found").status(404);
      return;
    }
    res.status(200).send(article);
  } catch (err) {
    console.log("Error fetching article: ", err);
    res.send("Internal Server Error").status(500);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const collection = db.collection("articles");
    const articleId = req.params.id;

    if (!ObjectId.isValid(articleId)) {
      res.status(400).send("Invalid article ID");
      return;
    }

    // Todo: input data validation remaining
    const updates = {
      $set: {
        description: req.body.description,
      },
    };

    const result = await collection.updateOne(
      { _id: new ObjectId(articleId) },
      updates
    );
    res.status(200).send(result);
  } catch (err) {
    console.log("Error fetching article: ", err);
    res.send("Internal Server Error").status(500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const collection = db.collection("articles");
    const articleId = req.params.id;

    if (!ObjectId.isValid(articleId)) {
      res.status(400).send("Invalid article ID");
      return;
    }

    const result = await collection.deleteOne({ _id: new ObjectId(articleId) });
    res.status(200).send(result);
  } catch (err) {
    console.log("Error fetching article: ", err);
    res.send("Internal Server Error").status(500);
  }
});

export default router;
