const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { check, validationResult } = require("express-validator");

const User = require("../models/user");

const router = express.Router();

// const DUMMY_USER = [
//   {
//     id: "u1",
//     username: "yashdeep",
//     password: "yashdeep",
//     email: "yashdeep@yashdeep.com",
//     friends: ["u1", "u2"],
//   },
// ];

router.get("/", async (req, res, next) => {
  const { username } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    const error = new Error("Something went wrong.");
    error.code = "500";
    return next(error);
  }

  if (!existingUser) {
    const error = new Error("Inavlid Username.");
    error.code = "401";
    return next(error);
  }

  res.json({ user: existingUser });
});

router.get("/login", async (req, res, next) => {
  const { username, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    const error = new Error("Login failed.");
    error.code = "500";
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new Error("Inavlid Credenials.");
    error.code = "401";
    return next(error);
  }

  res.json({ message: "Logged In" });
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

    const { username, password, email } = req.body;

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
      requests: [],
      friends: [],
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
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      const error = new Error("Invalid Inputs passed.");
      error.code = "422";
      return next(error);
    }

    const { username, password } = req.body;
    const userId = req.params.uid;

    let updatedUser;
    try {
      updatedUser = await User.findById(userId);
    } catch (err) {
      const error = new Error("Something went wrong.");
      error.code = "500";
      return next(error);
    }

    // const updatedUser = { ...DUMMY_USER.find((u) => u.id === userId) };
    // const userIndex = DUMMY_USER.findIndex((u) => u.id === userId);
    updatedUser.username = username;
    updatedUser.password = password;

    try {
      await updatedUser.save();
    } catch (err) {
      const error = new Error("Something went wrong.");
      error.code = "500";
      return next(error);
    }
    // DUMMY_USER[userIndex] = updatedUser;

    res.status(200).json({ user: updatedUser });
  }
);

router.patch("/sendreq/:sid/:rid", async (req, res, next) => {
  const sendersId = req.params.sid;
  const receiverId = req.params.rid;

  let receiverUser;
  try {
    receiverUser = await User.findById(receiverId);
  } catch (err) {
    const error = new Error("User does not exist, cant send request.");
    error.code = "404";
    return next(error);
  }

  receiverUser.requests.push(sendersId);

  try {
    await receiverUser.save();
  } catch (err) {
    const error = new Error("Something went wrong.");
    error.code = "500";
    return next(error);
  }

  res.status(200).json({ user: receiverUser });
});

router.patch("/acceptreq/:sid/:rid", async (req, res, next) => {
  const sendersId = req.params.sid;
  const receiverId = req.params.rid;

  let receiverUser;
  let senderUser;
  try {
    receiverUser = await User.findById(receiverId);
    senderUser = await User.findById(sendersId);
  } catch (err) {
    const error = new Error("User not found.");
    error.code = "404";
    return next(error);
  }

  const index = receiverUser.requests.indexOf(sendersId);
  if (index > -1) {
    receiverUser.requests.splice(index, 1);
  }
  receiverUser.friends.push(sendersId);
  senderUser.friends.push(receiverId);

  try {
    await receiverUser.save();
    await senderUser.save();
  } catch (err) {
    const error = new Error("Something went wrong.");
    error.code = "500";
    return next(error);
  }

  res.status(200).json({ message: "Updated" });
});

router.patch("/removefriend/:uid/:fid", async (req, res, next) => {
  const userId = req.params.uid;
  const friendId = req.params.fid;

  let user;
  let friend;
  try {
    user = await User.findById(userId);
    friend = await User.findById(friendId);
  } catch (err) {
    const error = new Error("Something went wrong.");
    error.code = "500";
    return next(error);
  }

  let index;
  index = user.friends.indexOf(friendId);
  if (index > -1) {
    user.friends.splice(index, 1);
  }

  index = friend.friends.indexOf(userId);
  if (index > -1) {
    friend.friends.splice(index, 1);
  }

  try {
    await user.save();
    await friend.save();
  } catch (err) {
    const error = new Error("Something went wrong.");
    error.code = "500";
    return next(error);
  }

  res.status(200).json({ message: "Updated" });
});

module.exports = router;
