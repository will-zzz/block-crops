import React, { useState } from "react";
import Plot from "./components/plot";
import data from "./data";

const mainStyles = {
  background:
    "green url(./assets/stock-vector-landscape-pixel-art-style-blue-sky-white-clouds-green-grass-on-ground-vector-illustration-game-1056926990.jpg) bottom center",
  minHeight: "500px",
  position: "relative",
  width: "100%",
};

function App() {
  const [money, setMoney] = useState(100);
  const [selectedCrop, setSelectedCrop] = useState(null);

  return (
    <div className="App">
      <header className="App-header"></header>
      <main style={mainStyles}>
        <Plot index="0" money={money} />
        <Plot index="1" money={money} />
        <Plot index="2" money={money} />
        <Plot index="3" money={money} />
        <Plot index="4" money={money} />
        <Plot index="5" money={money} />

        <button onClick={() => setSelectedCrop("Wheat")}>Wheat</button>
        <button onClick={() => setSelectedCrop("Melon")}>Melon</button>
        <button onClick={() => setSelectedCrop("Corn")}>Corn</button>
        <button onClick={() => console.log(selectedCrop)}>CURRENT CROP</button>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
