import React, { useState } from "react";

import User from "./User";
import "./Slider.css";

const Slider = (props) => {
  const [showSlider, setShowSlider] = useState(false);

  const handleSlider = () => {
    props.handleSlider();
  };

  return (
    <div id="slider">
      <div id="slider_header">
        <h3>Add Friends</h3>
        <div id="close_slider">
          <i className="fas fa-times fa-2x" onClick={handleSlider}></i>
        </div>
      </div>
      <hr></hr>

      <User />
      <div id="hr"></div>
      <User />
      <div id="hr"></div>
      <User />
      <div id="hr"></div>
      <User />
      <div id="hr"></div>
    </div>
  );
};
export default Slider;
