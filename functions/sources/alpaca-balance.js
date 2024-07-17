if (secrets.alpacaKey == "" || secrets.alpacaSecret) {
    throw Error("Alpaca api keys required")
}

const request = Functions.makeHttpRequest({
    url: "https://paper-api.alpaca.markets/v2/account",
    headers: {
        accept: application/json,
        'APCA-API-KEY-ID': secrets.alpacaKey,
        'APCA-API-SECRET-KEY': secrets.alpacaSecret
    }
})

const [response] = await Promise.all([request])
const portfolioBalance = response.data.portfolio_value
console.log(`Exchange portfolio balance: ${portfolioBalance}`)

return Functions.encodeUint256(Math.round(portfolioBalance * 100))