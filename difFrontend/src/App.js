import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Plot from "./components/plot";
import Menu from "./components/Menu/menu";
import { ThemeProvider } from "@mui/material";
import { defaultTheme } from "./layout/theme";
import Button from "./components/Button/button";
// if you delete this svg, be careful ab postbuild script
import logo from "./logo.svg";

function App() {
  const [provider, setProvider] = useState({});
  const [signer, setSigner] = useState({});
  const [cropInt, setCropInt] = useState(null);
  const [userAccount, setUserAccount] = useState("");
  const [isWalletConnected, setWalletConnected] = useState(false);

  async function updateEthers() {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const tempProvider = new ethers.providers.Web3Provider(window.ethereum);

    // MetaMask requires requesting permission to connect users accounts
    await tempProvider.send("eth_requestAccounts", []);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const tempSigner = tempProvider.getSigner();

    setProvider(tempProvider);
    setSigner(tempSigner);
  }

  async function connectWallet() {
    console.log("Requesting account...");

    // ❌ Check if Meta Mask Extension exists
    if (window.ethereum) {
      console.log("detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setUserAccount(accounts[0]);
        setWalletConnected(true);
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }

    updateEthers();
  }

  // useEffect(() => {
  //   requestAccount();
  //   // console.log(provider);
  //   // console.log(signer);
  // }, [window.ethereum]);

  return (
    <div className="App">
      <ThemeProvider theme={defaultTheme}>
        <header className="App-header"></header>
        <main>
          <div className="farm">
            <Plot
              cropInt={cropInt}
              plotNum={0}
              userAccount={userAccount}
              provider={provider}
              signer={signer}
            />
            <Plot
              cropInt={cropInt}
              plotNum={1}
              userAccount={userAccount}
              provider={provider}
              signer={signer}
            />
            <Plot
              cropInt={cropInt}
              plotNum={2}
              userAccount={userAccount}
              provider={provider}
              signer={signer}
            />
            <Plot
              cropInt={cropInt}
              plotNum={3}
              userAccount={userAccount}
              provider={provider}
              signer={signer}
            />
            <Plot
              cropInt={cropInt}
              plotNum={4}
              userAccount={userAccount}
              provider={provider}
              signer={signer}
            />
            <span className="crops--tomato1"></span>
            <div className="buttons">
              <button onClick={() => setCropInt(1)}>Tomato</button>
              <button onClick={() => setCropInt(2)}>Corn</button>
              <button onClick={() => connectWallet()}>Connect Wallet</button>
            </div>
            <p className="account">{userAccount}</p>
          </div>
        </main>
        {isWalletConnected ? (
          <Menu setCropInt={setCropInt} />
        ) : (
          <Button
            variant="contained"
            label="Connect wallet"
            onClick={connectWallet}
          />
        )}
      </ThemeProvider>
    </div>
  );
}

export default App;
