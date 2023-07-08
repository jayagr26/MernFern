import db from "../db/conn.js";
import newUserValidationSchema from "../validators/new-user-schema.js";

const validateData = async (req, res, next) => {
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    await newUserValidationSchema.validate(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send({ message: err });
  }
  next();
};

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const collection = db.collection("users");
    let user = await collection.findOne({ username: req.body.username });
    if (user) {
      return res.status(400).send({
        message: `Failed! Username: ${req.body.username} is already in use!`,
      });
    }

    user = await collection.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({
        message: `Failed! Email: ${req.body.email} is already in use!`,
      });
    }
    next();
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

const verifySignup = {
  checkDuplicateUsernameOrEmail,
  validateData,
};

export default verifySignup;
