import React from "react";

import User from "./User";
import "./Slider.css";

const Slider = () => {
  return (
    <div id="slider">
      <div id="slider_header">
        <h3>Add Friends</h3>
        <div id="close_slider">
          <i className="fas fa-times fa-2x"></i>
        </div>
      </div>
      <hr></hr>
      <div>
        <User />
        <div id="hr"></div>
        <User />
        <div id="hr"></div>
        <User />
        <div id="hr"></div>
        <User />
        <div id="hr"></div>
      </div>
    </div>
  );
};
export default Slider;
