import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Plot from "./components/plot";
import Token from "./artifacts/CropFarm.json";
// if you delete this svg, be careful ab postbuild script
import logo from "./logo.svg";

function App() {
  const [provider, setProvider] = useState({});
  const [signer, setSigner] = useState({});
  const [cropInt, setCropInt] = useState(null);
  const [userAccount, setUserAccount] = useState("");

  async function requestAccount() {
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
    setUserAccount(await tempSigner.getAddress());
  }

  useEffect(() => {
    requestAccount();
    console.log(provider);
    console.log(signer);
  }, [provider, signer]);

  return (
    <div className="App">
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
          </div>
          <p className="account">{userAccount}</p>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
