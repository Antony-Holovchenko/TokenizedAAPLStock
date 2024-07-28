const { ethers, network } = require("hardhat")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config.js")
const fs = require("fs")

module.exports = async({deployments})  => {
    const {deploy, log} = deployments
    const [deployer] = await ethers.getSigners();

    const mintSourceCode = fs.readFileSync("./functions/sources/alpaca-balance-request.js", "utf8")
    const sellSourceCode = ""

    log(`\n============ Deploying to ${network.name}  network ============\n`)

    const deployTKAAPL = await deploy("deployTKAAPL", {
        deployer: deployer,
        log: true,
        args: [mintSourceCode, sellSourceCode],
        blockConfirmations: developmentChains.insludes(network.name) 
        ? 1 
        : VERIFICATION_BLOCK_CONFIRMATIONS
    })

    log(`\n============ Successfully deployed contract to: ${await deployTKAAPL.address} ============\n`)
}

module.exports.tags = ["deployScript", "all"]