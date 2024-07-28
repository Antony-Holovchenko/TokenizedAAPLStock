// This config is used to run a simulator script.
const fs = require("fs")
const { Location, ReturnType, CodeLanguage } = require("@chainlink/functions-toolkit")
const { config } = require('@chainlink/env-enc');
config()

const requestConfig = {
    source: fs.readFileSync("./functions/sources/alpaca-balance-request.js").toString(),
    codeLocation: Location.Inline, // location of our request code
    secrets: {
        alpacaKey: process.env.ALPACA_API_KEY, 
        alpacaSecret: process.env.ALPACA_SECRET_KEY
    },
    secretsLocation: Location.DONHosted, // secrets will be uploaded to a DON
    args: [],
    codeLanguage: CodeLanguage.JavaScript,
    expectedReturnType: ReturnType.uint256
}

module.exports = { requestConfig }