const { network, tenderly } = require("hardhat")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config")
const { verify } = require("../helpers/verification/verify")
const fs = require("fs")

module.exports = async({deployments, getNamedAccounts})  => {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()
    
    const mintSourceCode = JSON.stringify(fs.readFileSync("./functions/sources/alpaca-balance-request.js", "utf8"))
    const sellSourceCode = ""
    const subId = 3263

    log(`\n============ Deploying to ${network.name} network ============\n`)

    const tkAAPL = await deploy("tkAAPL", {
        from: deployer,
        log: true,
        args: [mintSourceCode, sellSourceCode, subId],
        blockConfirmations: developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    })
    
    log(`\n============ Successfully deployed contract to: ${tkAAPL.address}  ============\n`)


    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        network.name == "sepolia"
        ? await verify(tkAAPL.address, tkAAPL.args)
        : await tendeplyVerify("tkAAPL", tkAAPL.address)
    } else {
        console.log(`\nYou are on local network, no verification required\n`)
    }
}

const tendeplyVerify = async(contractName, contractAddress) => {
    await tenderly.verify({
        name: contractName,
        address: contractAddress
    })
}

module.exports.tags = ["tkAAPL", "all"]