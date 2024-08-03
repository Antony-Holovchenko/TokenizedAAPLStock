const developmentChains = ["localhost", "hardhat"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6
const mockContracts = [
    {
     name: "MockFunctionsRouter",
    },
    {
     name: "MockUSDC"   
    },
    {
     name: "MockV3AggregatorV1" // contract required for AAPL price feed mock
    },
    {
     name: "MockV3AggregatorV2" // contract required for usdc_price_feed
    }
]
module.exports = {
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    mockContracts
}