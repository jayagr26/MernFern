import loginUservalidationSchema from "../validators/login-user-validation.js";

const validateData = async (req, res, next) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    await loginUservalidationSchema.validate(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send({ message: err });
  }
  next();
};

const verifyLogin = {
  validateData,
};

export default verifyLogin;
