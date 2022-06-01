import React, { useState } from "react";
import data from "../data";

export default function Plot(props) {
  // const [image, setImage] = useState(null);
  const [cropClass, setCropClass] = useState("empty");
  const [plotState, setPlotState] = useState(null);
  const [cropName, setCropName] = useState(null);

  function handleClick() {
    // if no crop in plot
    if (plotState === null && props.cropName) {
      setCropName(props.cropName);
      // setImage(process.env.PUBLIC_URL + "/images/" + props.cropName + "_5.png");
      setCropClass("crops--tomato0");
      setPlotState("growing");
      setTimeout(function () {
        setPlotState("grown");
      }, 3000);
      // Crop done growing
    } else if (plotState === "grown") {
      // setImage(null);
      setCropName(null);
      setPlotState(null);
    }
  }

  return (
    // <div>
    /* <img className="plot" src={image} onClick={handleClick} /> */
    <span className={cropClass} onClick={handleClick} />
    // </div>
  );
}
