import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import Input from "../Shared/Input";
import Button from "../Shared/Button";
import "./Home.css";

const Home = () => {
  const [loginForm, setLoginForm] = useState(false);
  const [signupForm, setSignupForm] = useState(false);
  const [displayText, setDisplayText] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const DUMMY_USER = [
    {
      id: "u1",
      username: "yashdeep",
      password: "yashdeep",
    },
  ];

  const submitHandler = (event) => {
    event.preventDefault();
    const foundUser = DUMMY_USER.find(
      (user) => user.username === username && user.password === password
    );
    if (foundUser) {
      window.location.href = `/${foundUser.id}`;
    } else {
      alert("Wrong Credentials.");
    }
  };

  const switchHandler = (event) => {
    if (loginForm) {
      setLoginForm(false);
      setSignupForm(true);
    } else {
      setSignupForm(false);
      setLoginForm(true);
    }
  };

  return (
    <React.Fragment>
      <NavLink to="/" id="logo">
        CHAT APP
      </NavLink>

      <form onSubmit={submitHandler} id="login-form">
        {(loginForm || signupForm) && (
          <Input
            type="text"
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
        )}
        {(loginForm || signupForm) && (
          <Input
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        )}
        {signupForm && (
          <Input
            type="email"
            placeholder="E-mail"
            onChange={(event) => setPassword(event.target.value)}
          />
        )}
        {loginForm && <Button type="submit">LOG IN</Button>}
        {signupForm && <Button type="submit">SIGNUP</Button>}
      </form>

      {displayText && (
        <div id="home-text">
          <h1>WELCOME</h1>
          <p>Please Log In or Sign Up to continue</p>
          <br></br>
          <i
            className="fas fa-arrow-right"
            id="fwd-icon"
            onClick={() => {
              setLoginForm(true);
              setDisplayText(false);
            }}
          ></i>
        </div>
      )}
      {!displayText && (
        <Button onClick={switchHandler}>
          SWITCH TO {loginForm ? "SIGNUP" : "LOGIN"}
        </Button>
      )}
    </React.Fragment>
  );
};

export default Home;
