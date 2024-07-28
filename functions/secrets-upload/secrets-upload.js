const ethers = require("ethers");
const fs = require("fs")
const { SecretsManager } = require("@chainlink/functions-toolkit")
require('dotenv').config()
const { config } = require('@chainlink/env-enc');
config()


async function uploadSecrets() {
    if (!process.env.INFURA_API_KEY) {
        console.log("INFURA_API_KEY variable in .env file has problems")
    }
    // Initialize a provider and signer instances.
    const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`)
    const encryptedPK = fs.readFileSync("./encryption/encryptedPk.json", "utf-8")
    const wallet = ethers.Wallet.fromEncryptedJsonSync(encryptedPK, process.env.PRIVATE_KEY_PASSWORD)
    const signer = wallet.connect(provider)

    // Initialize config for SecretsManager object
    const functionsRouterAddress = process.env.SEPOLIA_FUNCTIONS_ROUTER
    const donId = process.env.SEPOLIA_DON_ID
    const uploadURLs = [
        "https://01.functions-gateway.testnet.chain.link/", 
        "https://02.functions-gateway.testnet.chain.link/"
    ]

    // Initialize secrets
    const secrets = {
        alpacaKey: process.env.ALPACA_API_KEY, 
        alpacaSecret: process.env.ALPACA_SECRET_KEY
    }

    // Initialize secretsManager object
    const secretsManager = new SecretsManager({
        signer: signer,
        functionsRouterAddress: functionsRouterAddress,
        donId: donId
    })
    await secretsManager.initialize()

    // Encypt the secrets(API key; API secret)(This encrypted stuff will be uploaded to the DON)
    const encryptedSecretsObj = await secretsManager.encryptSecrets(secrets)

    // Send the upload request to DON
    const upload = await secretsManager.uploadEncryptedSecretsToDON({
        encryptedSecretsHexstring: encryptedSecretsObj.encryptedSecrets,
        gatewayUrls: uploadURLs,
        slotId: 1,
        minutesUntilExpiration: 15,
    })
    if (!upload.success) {
        throw new Error(`\nFailed to upload secrets to DON: ${upload.errorMessage}`)
    }
    console.log(`\nSuccessfully uploaded secrets to DON`)
    console.log(`Secrets version: ${upload.version}`)
}

uploadSecrets().catch((error) => {
    console.error(error)
    process.exit.code = 1
})