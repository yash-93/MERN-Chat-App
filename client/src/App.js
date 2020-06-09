import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Chat from "./components/Chat/Chat";
import "./App.css";

function App() {
  return (
    <Router>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/:uid" exact>
        <Chat />
      </Route>
    </Router>
  );
}

export default App;
