const { ethers } = require("hardhat")
const { SecretsManager } = require("@chainlink/functions-toolkit")

async function uploadSecrets() {
    // Create a provider and signer instances.
    const provider = new JsonRpcProvider(process.env.SEPOLIA_RPC_URL)
    const signer = new Wallet(process.env.PRIVATE_KEY, provider)
    // Create 
    const functionsRouterAddress = process.env.SEPOLIA_FUNCTIONS_ROUTER.toString()
    const donId = process.env.SEPOLIA_DON_ID.toString()

    const secretsManager = new SecretsManager({
        signer,
        functionsRouterAddress,
        donId
    })
}

uploadSecrets().catch((error) => {
    console.error(error)
    process.exit.code = 1
})