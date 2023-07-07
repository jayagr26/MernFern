import jwt from "jsonwebtoken";
import secret from "../config.js";

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
      req.userId = decoded.id;
      next();
    }
  });
};

const authJWT = {
  verifyToken,
};

export default authJWT;
