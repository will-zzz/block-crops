import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Plot from "./components/plot";
import Token from "./artifacts/CropFarm.json";
// if you delete this, be careful ab postbuild script
import logo from "./logo.svg";

const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const [selectedCrop, setSelectedCrop] = useState(null);
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

  useEffect(() => {
    requestAccount();
  }, []);

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <div className="farm">
          <Plot cropName={selectedCrop} plotNum="1" />
          <Plot cropName={selectedCrop} plotNum="2" />
          <Plot cropName={selectedCrop} plotNum="3" />
          <Plot cropName={selectedCrop} plotNum="4" />
          <Plot cropName={selectedCrop} plotNum="5" />
          <span className="crops--tomato1"></span>
          <div className="buttons">
            <button onClick={() => setSelectedCrop("tomato")}>Tomato</button>
            <button onClick={() => setSelectedCrop("corn")}>Corn</button>
          </div>
          <p className="account">{userAccount}</p>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
