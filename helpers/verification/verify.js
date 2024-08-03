const { run } = require("hardhat")

// Function for automatic contract verification after deployment to testnet/mainnet.
const verify = async(contractAddress, contractArguments) => {
    try {
        console.log(`========= Starting verification... =========\n`)
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: contractArguments
        })   
    } catch (error) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log(`========= Contract already verified =========`)
        } else {
            console.log(error)
        }
    }
}

// Function for automatic contract verification after deployment to tenderly virtual network.
const tenderlyVerify = async(contractName, contractAddress) => {
    await tenderly.verify({
        name: contractName,
        address: contractAddress
    })
}

module.exports = {
    verify,
    tenderlyVerify
}