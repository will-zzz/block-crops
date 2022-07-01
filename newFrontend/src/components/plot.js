import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Token from "../artifacts/CropFarm.json";

const tokenAddress = "0xeeb92d6b3999abdc8cc0226069d88c07f241fd4c";

export default function Plot(props) {
  // const [image, setImage] = useState(null);
  const [cropClass, setCropClass] = useState("crops--tomato1");
  const [plotState, setPlotState] = useState(null);

  function handleClick() {
    // if no crop in plot
    if (plotState === null && props.cropName) {
      setCropClass("crops--" + props.cropName + "0");
      setPlotState("growing");
      setTimeout(function () {
        setPlotState("grown");
      }, 3000);
      // Crop done growing
    } else if (plotState === "grown") {
      setPlotState(null);
    }
  }

  return <span className={cropClass} onClick={handleClick} />;
}
