import db from "../db/conn.js";
import updateUserSchema from "../validators/update-user-schema.js";
import { ObjectId } from "bson";

const validateData = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    let user = {};
    if (username) {
      user.username = username;
    }

    if (password) {
      user.password = password;
    }

    if (email) {
      user.email = email;
    }

    await updateUserSchema.validate(user);
    next();
  } catch (err) {
    if (err.name === "ValidationError") {
      console.log("Invalid user update data: " + err.message);
      return res
        .status(400)
        .send({ message: "Invalid user update data: " + err.message });
    }
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const collection = db.collection("users");
    if (req.body.username) {
      let user = await collection.findOne({ username: req.body.username });
      if (user) {
        if (
          JSON.stringify(user._id) ===
          JSON.stringify(new ObjectId(req.params.id))
        ) {
          return res.status(400).send({
            message: `Failed! Username: ${req.body.username} is same as before`,
          });
        }
        return res.status(400).send({
          message: `Failed! Username: ${req.body.username} is already in use!`,
        });
      }
    }

    if (req.body.email) {
      let user = await collection.findOne({ email: req.body.email });
      if (
        JSON.stringify(user._id) === JSON.stringify(new ObjectId(req.params.id))
      ) {
        return res.status(400).send({
          message: `Failed! Email: ${req.body.email} is same as before`,
        });
      }
      if (user) {
        return res.status(400).send({
          message: `Failed! Email: ${req.body.email} is already in use!`,
        });
      }
    }

    next();
  } catch (err) {
    console.log("Error checking duplicate user: " + err.message);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const verifyUpdateUser = {
  checkDuplicateUsernameOrEmail,
  validateData,
};

export default verifyUpdateUser;
