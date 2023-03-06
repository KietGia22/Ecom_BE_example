const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();
const secretKey = process.env.JWT_KEY;

const userAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, secretKey);
    const user = await User.findOne({
      _id: decodedToken.userId,
    });
    if (!user) return res.status(500).json({ error: "Unauthorized" });
    if (user.tokens.findIndex((ele) => ele.token === token) === -1)
      return res.status(401).json({ error: "Unauthorized" });
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Unauthorized" });
  }
};

module.exports = userAuth;
