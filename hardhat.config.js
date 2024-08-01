require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers")
require("@nomicfoundation/hardhat-verify");
require("hardhat-deploy")
require("@chainlink/env-enc").config();
const tdly = require("@tenderly/hardhat-tenderly");

tdly.setup({
  automaticVerifications: false
});

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
    virtual_sepolia: {
      url: `https://virtual.sepolia.rpc.tenderly.co/${process.env.TENDERLY_SEPOLIA_API_KEY}`,
      chainId: 446544
    }
  },
  tenderly: {
    project: "rwa-aapl-stock",
    username: "0xAg"
  },
  namedAccounts: {
    deployer: {
      default: 0
    },
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY
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
