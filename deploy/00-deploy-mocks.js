const { network } = require("hardhat")
const { tenderlyVerify } = require("../helpers/verification/verify")
const { mockConstructorConfig } = require("../helpers/constructor-configs/constructor-deploy-config")
const { mockContracts } = require("../helper-hardhat-config")

module.exports = async({deployments, getNamedAccounts}) => {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()
    // Using for loop, because we eed to deploy 4 mock contracts.
    for (let i = 0; i < 4; i++) {
        const contractName = mockContracts[i].name

        if (network.name == "hardhat" || network.name == "virtual_sepolia") {
            log(`\n============ Deploying ${contractName} to ${network.name} network ============\n`)
            
            let args = []
            if (contractName == "MockV3AggregatorV1") {
                args = [mockConstructorConfig.decimals, mockConstructorConfig.initial_answer]
            } else if (contractName == "MockV3AggregatorV2") {
                args = [mockConstructorConfig.decimals, mockConstructorConfig.initial_answer_usd]
            }

            const mockContract = await deploy(contractName, {
                from: deployer,
                log: true,
                args,
                blockConfirmations: 1
            })

            log(`\n============ Contract deployed to: ${mockContract.address}  ============\n`)

            if (network.name == "virtual_sepolia") {
                await tenderlyVerify(contractName, mockContract.address)
            }
        }
    }
}

module.exports.tags = ["mocks", "all"]