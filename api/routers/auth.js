const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// Register
router.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res
        .status(400)
        .json({ status: "error", message: "duplicate email" });
    }

    const newUser = await User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.ACCESS_SECRET
      ).toString(),
    });

    const createUser = await newUser.save();
    res.status(201).json(createUser);
  } catch (err) {
    res.status(401).json({ status: "error", message: "An error has occured" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user &&
      res
        .status(401)
        .json({ status: "error", message: "wrong email or password" });

    const bytes = CryptoJS.AES.decrypt(
      user.password,
      process.env.ACCESS_SECRET
    );

    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res
        .status(401)
        .json({ status: "error", message: "wrong email or password" });

    const payload = {
      id: user._id,
      isAdmin: user.isAdmin,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "5D",
      jwtid: uuidv4(),
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "30D",
      jwtid: uuidv4(),
    });

    const response = { accessToken, refreshToken };

    const { password, ...info } = user._doc;
    res.status(200).json({ ...info, ...response });
  } catch (err) {
    res
      .status(401)
      .json({ status: "error", message: "wrong email or password" });
  }
});

module.exports = router;
