const { run } = require("hardhat")

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

module.exports = {
    verify
}