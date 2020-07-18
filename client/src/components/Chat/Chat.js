import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import FriendList from "./Friends/FriendList";
import MessageSection from "./Messages/MessageSection";
import "./Chat.css";
import Navbar from "./NavBar/Navbar";

let socket;

const Chat = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [room, setRoom] = useState(null);
  const [friendList, setFriendList] = useState([]);
  const ENDPOINT = "http://localhost:5000";
  var user;
  var friendIdList;
  // var userId;

  // useEffect(() => {
  //   socket = io("http://localhost:5000");
  //   if (currentChat) {
  //     socket.emit("join", { currentChat, room }, () => {});
  //     console.log(socket);
  //   }
  //   return () => {
  //     socket.emit("disconnect");
  //     socket.off();
  //   };
  // });

  const getFriendData = async () => {
    try {
      for (var i = 0; i < friendIdList.length; i++) {
        const result = await fetch(
          `http://localhost:5000/api/users/${friendIdList[i]}`
        );
        const responseData = await result.json();
        var temp = {};
        temp.id = friendIdList[i];
        temp.username = responseData.user.username;
        setFriendList((oldList) => [...oldList, temp]);
        console.log(responseData.user.username);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      if (user) {
        const result = await fetch(
          `http://localhost:5000/api/users/${user.userId}`
        );
        // userId = user.userId;
        const responseData = await result.json();
        friendIdList = responseData.user.friends;
        console.log(friendIdList.length);
        getFriendData();
      } else {
        throw new Error("Error Occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    user = JSON.parse(localStorage.getItem("userData"));
    fetchData();
  }, [friendIdList]);

  useEffect(() => {
    socket = io(ENDPOINT);
    // socket.emit("join", { user, userId }, () => {});
    socket.emit("join", { user }, () => {});
    console.log(socket);
  }, []);

  const messageSectionHandler = (name) => {
    setCurrentChat(name);
    setRoom("room" + name);
    // socket = io("http://localhost:5000");
    // if (currentChat) {
    //   socket.emit("join", { currentChat, room }, () => {});
    //   console.log(socket);
    // }
    // return () => {
    //   socket.emit("disconnect");
    //   socket.off();
    // };
  };

  return (
    <React.Fragment>
      <Navbar />
      <div id="main-chat-container">
        <FriendList
          id="friend-list"
          messageSectionHandler={messageSectionHandler}
          friendList={friendList}
        />
        <MessageSection selectedFriend={currentChat} />
      </div>
    </React.Fragment>
  );
};

export default Chat;
