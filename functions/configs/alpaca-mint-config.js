// This config is used to run a simulator script.
const fs = require("fs")
const { Location, ReturnType, CodeLanguage } = require("@chainlink/functions-toolkit")

const requestConfig = {
    source: fs.readFileSync("./functions/sources/alpaca-balance.js"),
    codeLocation: Location.Inline, // location of our request code
    secrets: {
        alpacaKey: process.env.ALPACA_API_KEY, 
        alpacaSecret: process.env.ALPACA_SECRET_KEY
    },
    secretsLocation: Location.DONHosted, // secrets will be uploaded to a DON
    codeLanguage: CodeLanguage.JavaScript,
    expectedReturnType: ReturnType.uint256
}

module.exports = { requestConfig }