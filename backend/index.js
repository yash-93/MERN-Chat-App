const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const { disconnect } = require("process");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
//   next();
// });

app.use(cors());
// app.set("socketio", io);
io.on("connection", (socket) => {
  console.log("connected");
  socket.on("join", ({ user }, callback) => {
    if (user) {
      console.log(user);
    }
    // socket.on("join", ({ currentChat, room }, callback) => {
    //   if (currentChat) {
    //     console.log(currentChat + " connected to " + room);
    //   }
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use("/api/users", userRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});

mongoose
  .connect(
    "mongodb+srv://chat_app_user:BSngbnMhVPbCv8uL@cluster0-fpul6.mongodb.net/chatapp?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    server.listen(5000);
  })
  .catch((error) => {
    console.log(err);
  });
