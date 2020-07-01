import React, { useState, useEffect } from "react";

import Input from "../../Shared/Input";
import Button from "../../Shared/Button";
import "./MessageSection.css";
import Message from "./Message/Message";

const MessageSection = (props) => {
  const [msgs, setMsgs] = useState([
    { user: "Yashdeep", text: "Hi" },
    { user: "Prasun", text: "Hi" },
    { user: "Yashdeep", text: "HRU" },
    { user: "Prasun", text: "IMF9" },
    { user: "Yashdeep", text: "GR8" },
    { user: "Prasun", text: "Yeah" },
    { user: "Yashdeep", text: "Hello" },
    { user: "Prasun", text: "Hi" },
    { user: "Yashdeep", text: "HRU" },
    { user: "Prasun", text: "IMF9" },
    { user: "Yashdeep", text: "GR8" },
  ]);
  const [msg, setMsg] = useState();
  var name = "Yashdeep";
  var list = msgs.map((message, i) => (
    <div key={i}>
      <Message user={message.user} text={message.text} name={name} />
    </div>
  ));

  let tempMsg = {};
  useEffect(() => {
    var id = document.getElementById("endofchatbox");
    id.scrollIntoView({ behavior: "smooth" });
  });

  const sendMessageHandler = (event) => {
    event.preventDefault();
    tempMsg.user = name;
    tempMsg.text = msg;
    setMsgs([...msgs, tempMsg]);
    document.getElementById("inputMsg").value = "";
    setMsg(null);
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
          <form id="msgForm" onSubmit={sendMessageHandler}>
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
