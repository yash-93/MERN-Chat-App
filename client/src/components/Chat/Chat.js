import React, { useState } from "react";
import { useParams } from "react-router-dom";

import FriendList from "./Friends/FriendList";
import MessageSection from "./Messages/MessageSection";
import "./Chat.css";

const Chat = () => {
  const [currentChat, setCurrentChat] = useState("");
  const { uid } = useParams();

  const messageSectionHandler = (name) => {
    setCurrentChat(name);
  };

  return (
    <React.Fragment>
      <div id="main-chat-container">
        <FriendList
          id="friend-list"
          messageSectionHandler={messageSectionHandler}
        />
        <MessageSection selectedFriend={currentChat} />
      </div>
    </React.Fragment>
  );
};

export default Chat;
