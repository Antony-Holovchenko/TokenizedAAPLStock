const { network } = require("hardhat")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config")
const { verify, tenderlyVerify } = require("../helpers/verification/verify")
const { getConstructorConfig } = require("../helpers/constructor-configs/constructor-deploy-config")

module.exports = async({deployments, getNamedAccounts})  => {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()

    log(`\n============ Deploying to ${network.name} network ============\n`)
    
    const tkAAPL = await deploy("tkAAPL", {
        from: deployer,
        log: true,
        args: await getConstructorConfig(network.name), //dynamically get the constructor config based on the network
        blockConfirmations: developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    })
    
    log(`\n============ Contract deployed to: ${tkAAPL.address}  ============\n`)


    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        network.name == "sepolia"
        ? await verify(tkAAPL.address, tkAAPL.args)
        : await tenderlyVerify("tkAAPL", tkAAPL.address)
    } else {
        console.log(`\nYou are on local network, no verification required\n`)
    }
}

module.exports.tags = ["tkAAPL", "all"]