const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { check, validationResult } = require("express-validator");

const User = require("../models/user");

const router = express.Router();

const DUMMY_USER = [
  {
    id: "u1",
    username: "yashdeep",
    password: "yashdeep",
    email: "yashdeep@yashdeep.com",
    friends: ["u1", "u2"],
  },
];

router.get("/login/:userid", (req, res, next) => {
  const userId = req.params.userid;
  const user = DUMMY_USER.find((u) => {
    return u.id === userId;
  });

  if (!user) {
    const error = new Error("Could not find user.");
    error.code = 404;
    return next(error);
  }
  res.json({ user });
});

router.post(
  "/",
  [
    check("username").not().isEmpty(),
    check("password").isLength({ min: 6 }),
    check("email").isEmail().normalizeEmail(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Invalid Inputs passed.");
      error.code = "422";
      return next(error);
    }

    const { username, password, email, friends } = req.body;

    let existingUser;
    try {
      existingUser = await User.findOne({ email: email });
    } catch (err) {
      const error = new Error("Sign Up failed.");
      error.code = "500";
      return next(error);
    }

    if (existingUser) {
      const error = new Error("User already exists.");
      error.code = "422";
      return next(error);
    }

    const newUser = new User({
      username,
      password,
      email,
      friends,
    });

    try {
      await newUser.save();
    } catch (err) {
      const error = new Error("Sign up failed.");
      error.code = "500";
      return next(error);
    }

    res.status(201).json({ user: newUser });
  }
);

router.patch(
  "/:uid",
  [check("username").not().isEmpty(), check("password").isLength({ min: 6 })],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      const error = new Error("Invalid Inputs passed.");
      error.code = "422";
      return next(error);
    }

    const { username, password } = req.body;
    const userId = req.params.uid;
    const updatedUser = { ...DUMMY_USER.find((u) => u.id === userId) };
    const userIndex = DUMMY_USER.findIndex((u) => u.id === userId);
    updatedUser.username = username;
    updatedUser.password = password;
    DUMMY_USER[userIndex] = updatedUser;

    res.status(200).json({ user: updatedUser });
  }
);

module.exports = router;
