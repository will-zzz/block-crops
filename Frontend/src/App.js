import logo from "./logo.svg";
import "./App.css";
import Canvas from "./Canvas.js";

// function getLogo() {
//   if (window.chrome) {
//     return window.chrome.runtime.getURL(logo);
//   }

//   return logo;
// }

function App() {
  return <Canvas />;
}

export default App;
