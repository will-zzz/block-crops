import React, { useState } from "react";
import Plot from "./components/plot";
import data from "./data";
import logo from "./logo.svg";

function App() {
  const [money, setMoney] = useState(100);
  const [selectedCrop, setSelectedCrop] = useState(null);

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <div className="farm">
          <Plot cropName={selectedCrop} />
          <Plot cropName={selectedCrop} />
          <Plot cropName={selectedCrop} />
          <Plot cropName={selectedCrop} />
          <Plot cropName={selectedCrop} />
          <Plot cropName={selectedCrop} />
          <div className="buttons">
            <button onClick={() => setSelectedCrop("tomato")}>Tomato</button>
            <button onClick={() => setSelectedCrop("melon")}>Melon</button>
            <button onClick={() => setSelectedCrop("corn")}>Corn</button>
            <button onClick={() => console.log(selectedCrop)}>
              CURRENT CROP
            </button>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
