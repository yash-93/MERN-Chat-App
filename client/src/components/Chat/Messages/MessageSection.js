import React from "react";

import "./MessageSection.css";

const MessageSection = (props) => {
  return (
    <div id="message-section">
      <label id="selected-friend-label">{props.selectedFriend}</label>
      {props.selectedFriend && <hr></hr>}
    </div>
  );
};

export default MessageSection;
