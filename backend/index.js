const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes");

const app = express();
// const server = http.createServer(app);
// const io = socketio(server);

app.use(bodyParser.json());

app.use("/api/users", userRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});

app.listen(5000);
