require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy")
require("dotenv").config()
require("@chainlink/env-enc").config();
require("@nomicfoundation/hardhat-ethers")

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmations: 6
    },
    tenderly: {
      url: `https://virtual.mainnet.rpc.tenderly.co/${process.env.TENDERLY_API_KEY}`,
      chainId: 7295
    }
  },
  namedAccounts: {
    deployer: {
      default: 0
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.26"
      }
    ]
  }
};
