require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-foundry");
require("dotenv").config()

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [],
      chainId: 11155111,
      blockConfirmations: 6
    },
    tenderly: {
      url: process.env.TENDERLY_VM,
      chainId: 7295
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.8.26"
      }
    ]
  }
};
