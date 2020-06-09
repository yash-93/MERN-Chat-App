const express = require("express");

const router = express.Router();

const DUMMY_USER = [
  {
    id: "u1",
    username: "yashdeep",
    password: "yashdeep",
    friends: ["u1", "u2"],
  },
];

// router.post("/login", usersController.login);

router.get("/:userid", (req, res, next) => {
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

module.exports = router;
