import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";

import profile from "../../../images/profile.png";
import "./Navbar.css";
import { AuthContext } from "../../Shared/Context/auth-context";

const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const logoutHandler = (event) => {
    auth.logout();
    // history.push("/");
    window.location.replace("/");
  };

  return (
    <div id="navbar">
      <ul>
        <li>
          <a href="/">CHAT APP</a>
        </li>

        <li style={{ float: "right" }}>
          <a onClick={logoutHandler}>LOGOUT</a>
        </li>
        <li style={{ float: "right" }}>
          <a href="#username">USERNAME</a>
        </li>
        {/* <li style={{ float: "right" }}>
          <a>
            <img className="profile-pic1" src={profile} alt="pic" />
          </a>
        </li> */}
      </ul>
    </div>
  );
};

export default Navbar;
