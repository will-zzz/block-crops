import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Plot from "./components/plot";
import Token from "./artifacts/CropFarm.json";
// if you delete this svg, be careful ab postbuild script
import logo from "./logo.svg";

const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const [cropInt, setCropInt] = useState(null);
  const [userAccount, setUserAccount] = useState("");

  async function requestAccount() {
    try {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setUserAccount(accounts[0]);
    } catch (error) {
      console.log("error" + error);
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
          <Plot cropInt={cropInt} plotNum={0} userAccount={userAccount} />
          <Plot cropInt={cropInt} plotNum={1} userAccount={userAccount} />
          <Plot cropInt={cropInt} plotNum={2} userAccount={userAccount} />
          <Plot cropInt={cropInt} plotNum={3} userAccount={userAccount} />
          <Plot cropInt={cropInt} plotNum={4} userAccount={userAccount} />
          <span className="crops--tomato1"></span>
          <div className="buttons">
            <button onClick={() => setCropInt(1)}>Tomato</button>
            <button onClick={() => setCropInt(2)}>Corn</button>
          </div>
          <p className="account">{userAccount}</p>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
