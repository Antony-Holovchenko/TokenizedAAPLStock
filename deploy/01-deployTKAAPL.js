const { network } = require("hardhat")
const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../helper-hardhat-config")
const { verify } = require("../helpers/verification/verify")
const fs = require("fs")

module.exports = async({deployments, getNamedAccounts})  => {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()
    
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

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(deployTKAAPL.address, deployTKAAPL.args)
    } else {
        console.log(`\nYou are on local network, no verification required\n`)
    }
}

module.exports.tags = ["deployScript", "all"]