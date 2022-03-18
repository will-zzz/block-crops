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
        "dea62772e9d94ad96486f20d528935931fdfbd916f65c6d4d74b5f3d9eaacb83",
      ],
    },
  },
};
