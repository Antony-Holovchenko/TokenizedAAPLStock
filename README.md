# Tokenized AAPL stock
RWA segment continue growing and I am really interested in combination of the off chain assets
together with on chain features. This repository shows an example of tokenization of real AAPL shares.
These tokens represent an off chain asset(AAPL share) on chain, and at the same time these tokens are directly backed(collateralised) by the real AAPL shares.\
With the help of Chainlink Functions I am able to securely send and retrieve information from off chain resourses regarding actual share price and the amount of shares of user account.\
Hope you'll find this repository helpful.


## Technology Stack & Tools
- Solidity (Writing Smart Contracts)
- Javascript (Testing/Scripting)
- [Hardhat](https://hardhat.org/) (Development Framework)
- [Ethers.js](https://docs.ethers.io/v5/) (Blockchain Interaction)
- [Mocha](https://www.npmjs.com/package/mocha) (Testing Framework)
- [Chainlink](https://docs.chain.link/) (Off chain interraction)
- [Makefile](https://opensource.com/article/18/8/what-how-makefile) (Scripts automation execution) 

## Requirements For Initial Setup
- Install [NodeJS](https://nodejs.org/en/)

## Setting Up The Project
### 1. Clone/Download the Repository
`https://github.com/Antony-Holovchenko/TokenizedStock.git`

### 2. Install Dependencies:
`$ npm install`

### 3. Prepare .env file.
In .env file I am storing public variables that shouldn't be encrypted.
Please check the **.env.example** file, where I described the variables I am storing there./
❗️Never store sensitive data in non encrypted format in a .env file, especially private keys. Because you can accidentally forget to add .env to .gitignore and push this file to the remote repository. Or someone can see your private data when you'll sharing a screen on a meeting and so on.

### 3. Prepare .env.enc file.
In the .env.enc file I am storing private variables that shouldn't be seen publicly. In this file data is stored in encrypted format, so nobody who'll open this file on your machine won't understand the content. But I don't recommend to send this file to remote repository, instead it is a good idea, to keep this file in .gitignore./
Please check the **.env.enc.example** file, where I described the variables I am storing there.
Also, here is a guide, how to install env-enc and how to use it: [env-enc-guide](https://github.com/smartcontractkit/env-enc)




