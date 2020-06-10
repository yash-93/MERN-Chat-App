const express = require("express");
const { v4: uuidv4 } = require("uuid");

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

// router.post("/login", usersController.login);

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

router.post("/", (req, res, next) => {
  const { username, password, email } = req.body;
  const newUser = {
    id: uuidv4(),
    username,
    password,
    email,
  };

  DUMMY_USER.push(newUser);

  res.status(201).json({ newUser });
});

module.exports = router;
