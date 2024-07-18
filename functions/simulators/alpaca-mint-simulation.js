const { simulateScript, decodeResult } = require("@chainlink/functions-toolkit")
const { requestConfig } = require("./functions/configs/alpaca-mint-config.sol")

async function simulate() {
    /*
     1. simulateScript() func is used to simulate the execution
     of a custom Functions JavaScript source code locally.
     2. Basically this script is simulate, what happens inside Chainlink node,
     after sending a request. 
    */
    const {responseBytesHexstring, errorString, capturedTerminalOutput} = await 
    simulateScript(requestConfig)
    if (responseBytesHexstring) {
        console.log(`Response returned from request: ${decodeResult( //decoding hex strings into human readable values
            responseBytesHexstring, requestConfig.expectedReturnType
        )}\n`)
    }
    if (errorString) {
        console.log(`Request return an error: ${errorString}\n`)
    }
}

simulate().catch((error) => {
    console.error(error)
    process.exitCode = 1
})