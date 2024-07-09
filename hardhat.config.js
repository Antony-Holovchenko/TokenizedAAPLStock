require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

module.exports = {
  defaultNetwork: hardhat,
  networks: {
    hardhat: {
      chainId: 31337
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 6
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
