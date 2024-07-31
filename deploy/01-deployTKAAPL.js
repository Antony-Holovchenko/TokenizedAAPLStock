const { network } = require("hardhat")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config")
const fs = require("fs")

module.exports = async({deployments, getNamedAccounts})  => {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()
    console.log(deployer);
    
    const mintSourceCode = JSON.stringify(fs.readFileSync("./functions/sources/alpaca-balance-request.js", "utf8"))
    const sellSourceCode = ""

    log(`\n============ Deploying to ${network.name} network ============\n`)

    const deployTKAAPL = await deploy("deployTKAAPL", {
        from: deployer,
        log: true,
        args: [mintSourceCode, sellSourceCode],
        blockConfirmations: developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    })

    log(`\n============ Successfully deployed contract to: ${deployTKAAPL.address}  ============\n`)
}

module.exports.tags = ["deployScript", "all"]