import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Token from "../artifacts/CropFarm.json";

const cropIdToName = ["nothing", "tomato", "corn"];

const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function Plot(props) {
  const [image, setImage] = useState(
    "https://blockcrops.s3.amazonaws.com/images/empty.png"
  );
  const [cropInt, setCropInt] = useState(0);
  const [cropName, setCropName] = useState("empty");

  async function plant() {
    const contract = new ethers.Contract(tokenAddress, Token.abi, props.signer);
    const transaction = await contract.plant(props.plotNum, props.cropInt);
    await transaction.wait();
    console.log(transaction);
  }

  async function harvest() {
    const contract = new ethers.Contract(tokenAddress, Token.abi, props.signer);
    const transaction = await contract.harvest(props.plotNum);
    await transaction.wait();
    console.log(transaction);
  }

  async function viewGrowStatus() {
    const contract = new ethers.Contract(
      tokenAddress,
      Token.abi,
      props.provider
    );
    const growStatus = await contract.viewGrowStatus(
      props.userAccount,
      props.plotNum
    );
    // console.log(Number(growStatus[0]), Number(growStatus[1]));
    if (cropInt) {
      let percentage = Number(growStatus[0]) / Number(growStatus[1]);
      if (0 < percentage <= 0.2) {
        setImage(
          "https://blockcrops.s3.amazonaws.com/images/" + cropName + "_0.png"
        );
      } else if (0.2 < percentage <= 0.4) {
        setImage(
          "https://blockcrops.s3.amazonaws.com/images/" + cropName + "_1.png"
        );
      } else if (0.4 < percentage <= 0.6) {
        setImage(
          "https://blockcrops.s3.amazonaws.com/images/" + cropName + "_2.png"
        );
      } else if (0.6 < percentage <= 0.8) {
        setImage(
          "https://blockcrops.s3.amazonaws.com/images/" + cropName + "_3.png"
        );
      } else if (0.8 < percentage < 1) {
        setImage(
          "https://blockcrops.s3.amazonaws.com/images/" + cropName + "_4.png"
        );
      } else if (percentage >= 1) {
        setImage(
          "https://blockcrops.s3.amazonaws.com/images/" + cropName + "_5.png"
        );
      }
    } else {
      setImage("https://blockcrops.s3.amazonaws.com/images/empty.png");
    }
  }

  async function fetchCrops() {
    const contract = new ethers.Contract(
      tokenAddress,
      Token.abi,
      props.provider
    );
    const plotDetails = await contract.viewPlot(
      props.userAccount,
      props.plotNum
    );

    let epicNumber = Number(parseInt(plotDetails._hex));
    setCropInt(epicNumber);
    if (cropInt) {
      setCropName(cropIdToName[cropInt]);
    }
  }

  function handleClick() {
    // if no crop in plot
    if (props.cropInt && cropInt == 0) {
      plant();
    } else if (cropInt != 0) {
      harvest();
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (props.userAccount) {
        fetchCrops();
        viewGrowStatus();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [props.userAccount, cropInt, cropName, props.provider, props.signer]);

  return <img src={image} onClick={handleClick} className="plot" />;
}
