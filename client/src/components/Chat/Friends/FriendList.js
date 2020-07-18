import React from "react";

import Friend from "./Friend";
import "./FriendList.css";

const FriendList = (props) => {
  // const [friendList, setFriendList] = useState(props.friendList);

  return (
    <div id={props.id}>
      {props.friendList &&
        props.friendList.map((friend) => (
          <Friend
            key={friend.id}
            username={friend.username}
            messageSectionHandler={props.messageSectionHandler}
          ></Friend>
        ))}
    </div>
  );
};

export default FriendList;
