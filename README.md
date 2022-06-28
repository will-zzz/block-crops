# Block Crops

Block crops is the future of passive gaming and yield farming. Living in your browser as a chrome extension, the game injects onto any page you wish, allowing you to plant, harvest, and sell crops on the GodWoken L2 blockchain.

## Installing & Importing Extension

- run `npm install`
- In `/Frontend` directory, run `npm run build` to export React app to chrome extension format in `build` folder.
- In chrome browser, navigate to `chrome://extensions/`, turn on Developer Mode, and "Load Unpacked." Select build folder to import.

## Running

- In `/Backend`, run `npx hardhat node` to launch a local blockchain
- In a separate `/Backend` terminal, run `npx hardhat run --network localhost scripts/deploy.js` to deploy the token to the local blockchain.
- In Metamask, set up the Hardhat network. Add a network with the RPC URL as `http://127.0.0.1:8545/`, and the chain ID as `31337`.
- In `/Frontend`, run `npm run start` to launch the game!
