import React from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { uid } = useParams();
  return <div>Welcome {uid}</div>;
};

export default Chat;
