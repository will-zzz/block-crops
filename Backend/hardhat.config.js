// const { network } = require("hardhat");
require("dotenv").config();

require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.1",
  networks: {
    hardhat: {``
      chainID: 1337,
      mining: {
        auto: false,
        interval: 5000,``
      },
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/76c5b111cb5e4a2b8a5da65fd8671cb3",
      accounts: [process.env.ACC_PRIVATE_KEY],
    },
    old_godwoken: {
      url: "https://godwoken-testnet-web3-v1-rpc.ckbapp.dev",
      // chainID: 71393,
      accounts: [process.env.ACC_PRIVATE_KEY],
    },
    gdwkn_testnet_v1p1: {
      url: "https://godwoken-testnet-v1.ckbapp.dev",
      chainID: 71401,
      accounts: [process.env.ACC_PRIVATE_KEY],
    },
  },
};
