import db from "../db/conn.js";

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
    console.log("hello1");
    console.log(err);
    return res.status(500).send({ message: err });
  }
};

const verifySignup = {
  checkDuplicateUsernameOrEmail,
};

export default verifySignup;
