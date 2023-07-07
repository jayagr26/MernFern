import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "./db/conn.js";
import secret from "./config.js";

export const signup = async (req, res) => {
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  };

  try {
    const collection = db.collection("users");
    await collection.insertOne(user);
    return res.status(200).send({ message: "User registered sucessfully!" });
  } catch (err) {
    console.log("hello2");
    return res.status(500).send({ message: err });
  }
};

export const login = async (req, res) => {
  try {
    const collection = db.collection("users");
    const user = await collection.findOne({ username: req.body.username });

    if (!user) {
      return res.status(404).send({ message: "User does not exists!" });
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
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
    console.log("hello3");
    console.log(err);
    return res.status(503).send({ message: err });
  }
};
