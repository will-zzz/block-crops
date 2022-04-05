import React, { useRef, useEffect, useState } from "react";
import "./Farm.css";
import { ethers } from "ethers";
import Background from "./handlers/Background.js";
import dayTime from "./images/day.png";
import handleCrops from "./handlers/Crops.js";
import data from "./data.js";
// update this ABI when compiling solidity code
import Token from "./artifacts/CropFarm.json";

let bgImage = new Image();
bgImage.src = dayTime;
let crops = [];

const tokenAddress = "0xeeb92d6b3999abdc8cc0226069d88c07f241fd4c";

const Farm = () => {
  const [userAccount, setUserAccount] = useState("");

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
      const balance = await contract.balanceOf(account, 1);
      console.log("Balance: ", balance.toString());
    }
  }

  async function plant() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transaction = await contract.plant(0, 1);
      await transaction.wait();
      console.log(`Crops successfully planted`);
    }
  }

  // PLANT CROPS
  document.addEventListener("keydown", (e) => {
    if (!e.repeat) {
      if (e.key == "a") {
        e.stopImmediatePropagation();
        // console.log("AYOOOOO");
        getBalance();
      }
    }
  });

  const canvasRef = useRef(null);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      let { crop } = data;

      // assign crops
      // handleCrops(ctx, crop);
      // Draw Background Image
      Background(bgImage, ctx, canvas);

      // Draw crops
      // new Crop();

      requestAnimationFrame(render);
    };
    render();
  }, []);
  return <canvas id="farmCanvas" ref={canvasRef} width="384px" height="64px" />;
};

export default Farm;
