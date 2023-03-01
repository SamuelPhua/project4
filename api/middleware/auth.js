const jwt = require("jsonwebtoken");
require("dotenv").config()

const auth = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
      if (err) res.status(403).json("Token invalid");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are unauthenticated");
  }
}

module.exports = auth;
