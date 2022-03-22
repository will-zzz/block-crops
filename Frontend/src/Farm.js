import React, { useRef, useEffect } from "react";
import "./Farm.css";
import { ethers } from "ethers";
import Background from "./handlers/Background.js";
import dayTime from "./images/day.png";
import Crops from "./handlers/Crops.js";

let bgImage = new Image();
bgImage.src = dayTime;

const Farm = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Draw Background Image
      Background(bgImage, ctx, canvas);

      // Draw crops
      Crops();

      // Planting by user
      document.onkeydown = checkKey;
      function checkKey(e) {
        e = e || window.event;

        if (e.keyCode == "38") {
          // up arrow
          console.log("up");
          plantCrop();
        }
      }
      requestAnimationFrame(render);
    };
    render();
  }, []);
  return <canvas id="farmCanvas" ref={canvasRef} width="384px" height="64px" />;
};

export default Farm;
