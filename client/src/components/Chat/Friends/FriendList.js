import React from "react";

import Friend from "./Friend";
import "./FriendList.css";

const DUMMY_FRIENDS = [
  {
    id: "u1",
    username: "yashdeep",
    password: "yashdeep",
  },
  {
    id: "u2",
    username: "prasun",
    password: "prasun",
  },
  {
    id: "u3",
    username: "himanshu",
    password: "himanshu",
  },
  {
    id: "u4",
    username: "rishabh",
    password: "rishabh",
  },
  {
    id: "u1",
    username: "yashdeep",
    password: "yashdeep",
  },
  {
    id: "u2",
    username: "prasun",
    password: "prasun",
  },
  {
    id: "u3",
    username: "himanshu",
    password: "himanshu",
  },
  {
    id: "u4",
    username: "rishabh",
    password: "rishabh",
  },
  {
    id: "u1",
    username: "yashdeep",
    password: "yashdeep",
  },
  {
    id: "u2",
    username: "prasun",
    password: "prasun",
  },
  {
    id: "u3",
    username: "himanshu",
    password: "himanshu",
  },
  {
    id: "u4",
    username: "rishabh",
    password: "rishabh",
  },
];

const FriendList = (props) => {
  return (
    <div id={props.id}>
      {DUMMY_FRIENDS.map((friend) => (
        <Friend
          username={friend.username}
          messageSectionHandler={props.messageSectionHandler}
        ></Friend>
      ))}
    </div>
  );
};

export default FriendList;
