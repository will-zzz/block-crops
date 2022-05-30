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
      <main>
        <div className="farm">
          <Plot cropName={selectedCrop} />
          <Plot cropName={selectedCrop} />
          <Plot cropName={selectedCrop} />
          <Plot cropName={selectedCrop} />
          <Plot cropName={selectedCrop} />
          <Plot cropName={selectedCrop} />
          <button onClick={() => setSelectedCrop("wheat")}>Wheat</button>
          <button onClick={() => setSelectedCrop("melon")}>Melon</button>
          <button onClick={() => setSelectedCrop("corn")}>Corn</button>
          <button onClick={() => console.log(selectedCrop)}>
            CURRENT CROP
          </button>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
