import React, { useState } from "react";
import { ethers } from "ethers";
import Token from "../artifacts/CropFarm.json";

const tokenAddress = "0xeeb92d6b3999abdc8cc0226069d88c07f241fd4c";

const plotStyles = {
  background: "rgba( 51, 51, 51, 0.5 )",
  border: "2px solid black",
  borderCollapse: "collapse",
  display: "inline-block",
  height: "200px",
  top: 0,
  width: "200px",
};

const Plot = (props) => {
  let image = null;
  const [bg, setBG] = useState(null);
  const [crop, setCrop] = useState(null);
  const [isGrowing, setGrowing] = useState(false);
  const styles = Object.assign({}, plotStyles);
  const [userAccount, setUserAccount] = useState("");

  async function requestAccount() {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setUserAccount(accounts[0]);
  }

  async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
      const balance = await contract.viewBalance(account, 1, 0);
      console.log("Balance: ", balance.toString());
    }
  }

  if (isGrowing) {
    // set img
    styles.background = bg;
  } else if (bg) {
    styles.background = bg;
  }

  const handleMouseOver = (e) => {
    //mouse position?
    if (!isGrowing) {
      setBG("yellow");
    }
    if (userAccount === "") {
      requestAccount();
    }
    console.log("Account: " + userAccount);
  };

  const handleMouseOut = (e) => {
    if (!isGrowing) {
      setBG(null);
    }
  };

  const handlePlantCrop = (e) => {
    if (isGrowing) {
      //error
      handleHarvestCrop();
      return;
    }

    setBG("red");
    setCrop(props.selectedCrop);
    setGrowing(true);
  };

  const handleHarvestCrop = (e) => {
    setCrop(null);
    setGrowing(false);
    setBG(null);
  };

  return (
    <div
      style={styles}
      onClick={handlePlantCrop}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    ></div>
  );
};

export default Plot;
