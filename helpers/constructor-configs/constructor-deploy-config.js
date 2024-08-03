const fs = require("fs")

// Fetching the source code for our requests.
const mintSourceCode = JSON.stringify(fs.readFileSync("./functions/sources/alpaca-balance-request.js", "utf8"))
const sellSourceCode = ""

// Constructor configs for each netowork. 
const constructorConfig = {
    sepolia: {
        functions_router: "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0",
        donId: "0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000",
        subId: 3263,
        aapl_price_feed: "0xc59E3633BAAC79493d908e63626716e204A45EdF",
        usdc_price_feed: "0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E",
        usdc_contract: "0xC43cc2005484349AAd5553951E7208a720513e00",
        mintSourceCode: mintSourceCode,
        sellSourceCode: sellSourceCode,
        secrets_slot: 1,
        secrets_version: 1722012508
    },
    virtual_sepolia: {
        functions_router: "0xE3C084e1eDc823291AF4f63bd5ABF76893B90A09",
        donId: "0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000", // some random id
        subId: 1, // some random number
        aapl_price_feed: "0xa47E99bF277f143FE8A1C082d8b2517fa886F1D5",// MockV3AggregatorV1
        usdc_price_feed: "0xE328363fAe63Ad73e34f678e5AdAc9E80C18aB98", // MockV3AggregatorV2
        usdc_contract: "0xf05BBB6d4eaA7182cDeB226Ee94F1648EbC651dA", // MockUSDC
        mintSourceCode: mintSourceCode,
        sellSourceCode: sellSourceCode,
        secrets_slot: 0, // some random number
        secrets_version: 0 // some random number
    },
    hardhat: {
        functions_router: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        donId: "0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000", // some random id
        subId: 1, // some random number
        aapl_price_feed: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", // MockV3AggregatorV1
        usdc_price_feed: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9", // MockV3AggregatorV2
        usdc_contract: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", // MockUSDC
        mintSourceCode: mintSourceCode,
        sellSourceCode: sellSourceCode,
        secrets_slot: 0, // some random number
        secrets_version: 0 // some random number
    }
}

// Constructor config for mock contract
const mockConstructorConfig = {
    decimals: 8,
    initial_answer: 2000e8,
    initial_answer_usd: 1e8
}

/* Function return the constructor config, based on the provided
 network in parameter. So that we can dynamically select the appropriate
 config. 
*/
const getConstructorConfig = async(networkName) => {
    const config = constructorConfig[networkName]
    const args = [
        config.functions_router,
        config.donId,
        config.subId,
        config.aapl_price_feed,
        config.usdc_price_feed,
        config.usdc_contract,
        config.mintSourceCode,
        config.sellSourceCode,
        config.secrets_slot,
        config.secrets_version
    ]
    return args
}

module.exports = {
    constructorConfig,
    mockConstructorConfig,
    getConstructorConfig
}
