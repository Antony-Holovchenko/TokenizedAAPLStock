# Tokenized AAPL stock
 

## Technology Stack & Tools

- Solidity (Writing Smart Contracts)
- Javascript (Testing/Scripting)
- [Hardhat](https://hardhat.org/) (Development Framework)
- [Ethers.js](https://docs.ethers.io/v5/) (Blockchain Interaction)
- [Mocha](https://www.npmjs.com/package/mocha) (Testing Framework)
- [Chainlink](https://docs.chain.link/) (Off chain interraction)

## Requirements For Initial Setup
- Install [NodeJS](https://nodejs.org/en/)

## Setting Up The Project
### 1. Clone/Download the Repository
`https://github.com/Antony-Holovchenko/TokenizedStock.git`

### 2. Install Dependencies:
`$ npm install`

### 3. Run tests
`$ npm run ht`

### 5. Run deployment script
In a separate terminal execute:
`$ npm run hd --"network"`\
or if you are working with Sepolia testnet run -->
`$ npm run hds`

### 4. Start Hardhat node(localhost)
`$ npx hardhat node`

### 5. Once localhost is running, try to interract with the scripts
In a separate terminal execute:
`$ npx hardhat run scripts/<script-name> --"network"`
