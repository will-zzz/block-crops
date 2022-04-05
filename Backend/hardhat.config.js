// const { network } = require("hardhat");

require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.1",
  networks: {
    hardhat: {
      chainID: 1337,
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/76c5b111cb5e4a2b8a5da65fd8671cb3",
      accounts: [
        "9db4c3f2e7295e720030d286d730bff3695c56c5685d70840ee16a63c4531b7e",
      ],
    },
    godwoken: {
      url: "https://godwoken-testnet-web3-v1-rpc.ckbapp.dev",
      // chainID: 71393,
      accounts: [
        "9db4c3f2e7295e720030d286d730bff3695c56c5685d70840ee16a63c4531b7e",
      ],
    },
  },
};
