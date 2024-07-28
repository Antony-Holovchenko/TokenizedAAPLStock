require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
require("@chainlink/env-enc").config();
config()

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
      url: `https://virtual.mainnet.rpc.tenderly.co/${process.env.TENDERLY_API_KEY}`,
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
