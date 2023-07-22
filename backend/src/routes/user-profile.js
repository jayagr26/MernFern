import db from "../db/conn.js";
import { ObjectId } from "bson";
import express from "express";
import { encryptPassword } from "../helpers/passwordCrypto.js";
import middlewares from "../middlewares/index.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const collection = db.collection("users");

    const userId = req.params.id;

    if (!ObjectId.isValid(articleId)) {
      return res.status(404).send("Invalid User ID!");
    }

    const user = await collection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.send("User not found!").status(200);
    }

    res.status(200).send({ username: user.username, email: user.email });
  } catch (err) {
    console.log(`Error fetching user profile: ${err.message}`);
    res.status(503).send({ message: "Error fetching user profile!" });
  }
});

router.put(
  "/:id",
  [
    middlewares.verifyUpdateUser.validateData,
    middlewares.verifyUpdateUser.checkDuplicateUsernameOrEmail,
  ],
  async (req, res) => {
    try {
      const collection = db.collection("users");
      const userId = req.params.id;

      if (!ObjectId.isValid(userId)) {
        return res.status(404).send("Invalid User ID!");
      }

      let user = await collection.findOne({ _id: new ObjectId(userId) });

      if (!user) {
        return res.status(404).send("User not found!");
      }

      const { username, email, password } = req.body;

      if (username) {
        user.username = username;
      }

      if (password) {
        user.password = encryptPassword(password);
      }

      if (email) {
        user.email = email;
      }

      await collection.updateOne({ _id: new ObjectId(userId) }, { $set: user });
      return res
        .status(200)
        .send({ message: "User profile updated successfully!" });
    } catch (err) {
      console.log("Error updating user profile: " + err.message);
      res.status(503).send({ message: "Error updating user profile!" });
    }
  }
);

export default router;
