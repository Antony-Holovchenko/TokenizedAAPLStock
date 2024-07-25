//require("dotenv").config({ path: '../.env' })
// The script is doing a GET request to an exchange account and return
// the balance of the account.
// ! Note that I will change it soon, to request how many AAPL shares are in the account.
if (secrets.alpacaKey == "" || secrets.alpacaSecret === "") {
    throw Error("Alpaca api keys required")
}

const request = Functions.makeHttpRequest({
    url: "https://paper-api.alpaca.markets/v2/account",
    headers: {
        "Content-Type": "application/json",
        'APCA-API-KEY-ID': secrets.alpacaKey,
        'APCA-API-SECRET-KEY': secrets.alpacaSecret
    }
})

const [response] = await Promise.all([request])
const portfolioBalance = response.data.portfolio_value
console.log(`Exchange portfolio balance: ${portfolioBalance}`)

return Functions.encodeUint256(Math.round(portfolioBalance * 100))