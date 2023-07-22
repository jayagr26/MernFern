import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import secret from "./config.js";
import db from "./db/conn.js";
import {
  isCorrectPassword,
  encryptPassword,
} from "./helpers/passwordCrypto.js";

export const signup = async (req, res) => {
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: encryptPassword({ password: req.body.password }),
  };

  try {
    const collection = db.collection("users");
    await collection.insertOne(user);
    return res.status(200).send({ message: "User registered sucessfully!" });
  } catch (err) {
    console.log("Error registering user: " + err.message);
    return res.status(500).send({ message: "Error Registering User!" });
  }
};

export const login = async (req, res) => {
  try {
    const collection = db.collection("users");
    const user = await collection.findOne({ username: req.body.username });

    if (!user) {
      return res.status(404).send({ message: "User does not exists!" });
    }

    if (
      isCorrectPassword({
        currentPassword: user.password,
        input: req.body.password,
      })
    ) {
      const token = jwt.sign({ id: user.username }, secret.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400,
      });
      return res.status(200).send({
        username: user.username,
        email: user.email,
        accessToken: token,
      });
    } else {
      return res.status(404).send({ message: "Password incorrect!" });
    }
  } catch (err) {
    console.log("Error logging user: " + err.message);
    return res.status(503).send({ message: "Error in Logging user!" });
  }
};
