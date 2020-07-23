import React, { useState, useEffect } from "react";

import Input from "../../Shared/Input";
import Button from "../../Shared/Button";
import "./MessageSection.css";
import Message from "./Message/Message";

const MessageSection = (props) => {
  // const [msgs, setMsgs] = useState([
  //   { user: "Yashdeep", text: "Hi" },
  //   { user: "Prasun", text: "Hi" },
  //   { user: "Yashdeep", text: "HRU" },
  //   { user: "Prasun", text: "IMF9" },
  //   { user: "Yashdeep", text: "GR8" },
  //   { user: "Prasun", text: "Yeah" },
  //   { user: "Yashdeep", text: "Hello" },
  //   { user: "Prasun", text: "Hi" },
  //   { user: "Yashdeep", text: "HRU" },
  //   { user: "Prasun", text: "IMF9" },
  //   { user: "Yashdeep", text: "GR8" },
  // ]);
  const [msg, setMsg] = useState();
  const [receiverId, setReceiverId] = useState();
  var list = props.msgs.map((message, i) => (
    <div key={i}>
      <Message user={message.user} text={message.text} name={message.name} />
    </div>
  ));

  let tempMsg = {};
  useEffect(() => {
    setReceiverId(props.receiverId);
    var id = document.getElementById("endofchatbox");
    id.scrollIntoView({ behavior: "smooth" });
  });

  // const sendMessageHandler = (event) => {
  //   event.preventDefault();
  //   tempMsg.user = name;
  //   tempMsg.text = msg;
  //   setMsgs([...msgs, tempMsg]);
  //   document.getElementById("inputMsg").value = "";
  //   setMsg(null);
  // };

  const sendMessge = (event) => {
    event.preventDefault();
    var user = JSON.parse(localStorage.getItem("userData"));
    props.messageHandler(`${msg}`, user.userId, receiverId, user.username);
  };

  return (
    <React.Fragment>
      <div id="message-section">
        <label id="selected-friend-label">{props.selectedFriend}</label>
        {props.selectedFriend && <hr></hr>}
        <div id="messages">
          {props.selectedFriend && list}
          <div id="endofchatbox"></div>
        </div>
        {props.selectedFriend && (
          <form id="msgForm" onSubmit={sendMessge}>
            <Input
              id="inputMsg"
              type="text"
              placeholder="Enter message here..."
              onChange={(event) => setMsg(event.target.value)}
            />
            <Button id="sendMsg">Send</Button>
          </form>
        )}
      </div>
    </React.Fragment>
  );
};

export default MessageSection;
