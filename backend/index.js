const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const { disconnect, on } = require("process");
const { use } = require("./routes/userRoutes");
const user = require("./models/user");

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

var userFriends = new Map();
var userOnlineFriends = new Map();
let onlineUsers = new Map();
// function getCommon(onlineUsers, currentUserFriends) {
//   onlineUsers.sort();
//   currentUserFriends.sort();
//   var common = [];
//   var i = 0,
//     j = 0;
//   while (i < onlineUsers.length && j < currentUserFriends.length) {
//     if (onlineUsers[i] == currentUserFriends[j]) {
//       common.push(onlineUsers[i]);
//       i++;
//       j++;
//     } else if (onlineUsers[i] < currentUserFriends[j]) {
//       i++;
//     } else {
//       j++;
//     }
//   }
//   return common;
// }
io.on("connection", (socket) => {
  // console.log("connected");
  // console.log(socket);
  let u = "";
  socket.on("join", ({ user }, callback) => {
    u = user.userId;
    if (!onlineUsers.has(user.userId)) {
      onlineUsers.set(user.userId, socket.id);
    }
    // var isPresent = onlineUsers.find((id) => {
    //   return id == user.userId;
    // });
    // if (!isPresent) {
    //   onlineUsers.push(user.userId);
    // }
    console.log("Online Users", onlineUsers);
    var temp = user.friends;
    userFriends.set(user.userId, temp);
    console.log("User Friends", userFriends);
    //console.log([...userFriends.get(socket.id)]);

    //var keys = [...onlineUsers.keys()];

    var temp2 = [];
    var friends = userFriends.get(user.userId);
    for (var i = 0; i < friends.length; i++) {
      const iterator1 = onlineUsers.keys();
      for (var j = 0; j < onlineUsers.size; j++) {
        if (friends[i] === iterator1.next().value) {
          temp2.push(friends[i]);
          break;
        }
      }
    }
    userOnlineFriends.set(user.userId, temp2);

    for (var i = 0; i < temp2.length; i++) {
      var temp3 = userOnlineFriends.get(temp2[i]);
      temp3.push(user.userId);
      userOnlineFriends.set(temp2[i], temp3);
    }
    // for (var p = 0; p < temp2.length; p++) {
    //   if (
    //     onlineUsers.has("5ee9ef96da4292eba881eabd") &&
    //     "5ee9ef96da4292eba881eabd" !== user.userId
    //   ) {
    //     let t = true;
    //     socket
    //       .to(onlineUsers.get("5ee9ef96da4292eba881eabd"))
    //       .emit("updateFriends", t);
    //     console.log(p, " ", onlineUsers.get(temp2[p]));
    //   }
    // }

    // console.log("**", temp2);
    socket.emit("myOnlineFriends", temp2);
    // socket.emit("myOnlineFriends",  temp2 , () => {
    //   console.log("User Online Friends", userOnlineFriends);
    // });

    let z;
    for (var i = 0; i < temp2.length; i++) {
      z = userOnlineFriends.get(temp2[i]);
      socket.to(onlineUsers.get(temp2[i])).emit("updateFriends", z);
      console.log(i, " ", onlineUsers.get(temp2[i]), " ", z);
    }

    console.log("User Online Friends", userOnlineFriends);
  });

  socket.on("chatting", (data) => {
    //console.log(data.msg + " " + data.id + " " + data.receiver);
    socket.to(onlineUsers.get(data.receiver)).emit("receiverPeer", {
      msg: data.msg,
      id: data.id,
      receiverid: onlineUsers.get(data.receiver),
      senderName: data.senderName,
    });
    // .emit("receiverPeer", (msg, socket.id, onlineUsers.get(receiverID)));
    socket.emit("senderPeer", {
      msg: data.msg,
      id: data.id,
      receiver: onlineUsers.get(data.receiver),
      senderName: data.senderName,
    });
  });

  // socket.on("join", ({ currentChat, room }, callback) => {
  //   if (currentChat) {
  //     console.log(currentChat + " connected to " + room);
  //   }
  socket.on("disconnect", () => {
    console.log("User disconnected");
    // console.log(onlineUsers.get(socket.id));
    onlineUsers.delete(u);
    // keys = [...onlineUsers.keys()];

    // var fr = userOnlineFriends.get(socket.id);
    // //var fr = Array.from(userOnlineFriends.keys());

    temp2 = userOnlineFriends.get(u);
    // console.log(temp2);
    for (var i = 0; i < temp2.length; i++) {
      temp3 = userOnlineFriends.get(temp2[i]);
      temp3.splice(temp3.indexOf(u), 1);
      userOnlineFriends.set(temp2[i], temp3);
      socket.to(onlineUsers.get(temp2[i])).emit("updateFriends", temp2[i]);
    }

    // let z;
    // for (var i = 0; i < temp2.length; i++) {
    //   z = userOnlineFriends.get(temp2[i]);
    //   socket.to(onlineUsers.get(temp2[i])).emit("updateFriends", z);
    //   console.log(i, " ", onlineUsers.get(temp2[i]), " ", z);
    // }

    userOnlineFriends.delete(u);
    console.log("*****");
    console.log("Online Users", onlineUsers);
    console.log("User Friends", userFriends);
    console.log("User Online Friends", userOnlineFriends);
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
