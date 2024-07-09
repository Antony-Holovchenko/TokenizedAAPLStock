// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";

contract tkAPPL is ConfirmedOwner{
    
    constructor() ConfirmedOwner(msg.sender) {

    }

    /**
     * @notice User send a request for minting an AAPL token.
     * @dev Send an HTTP request to Chainlink. Function will send 2 txs.
     * 1st tx will send a request to Chainlink node, to check the stocks balance of the user.
     * 2nd tx will do a callback to the APPL contract and do a token minting if user balance is enough for this. 
     */
    function sendMintRequest(uint256 _amount) external {

    }

    /**
     * @dev After calling "sendMintRequest" function, the Chainlink node will return a response
     * which will be used in this function.
     */
    function _mintFulFillRequest() internal {
        
    }

    /**
     * @notice User send a request to sell AAPL token for USDC.
     * @dev Chainlink will call the exchange app, and do the next operations:
     * 1. Sell AAPL stock on the exchange.
     * 2. Buy USDC on the exchange.
     * 4. Send USDC to this smart contract. 
     */
    function sendRedeemRequest()  external {
        
    }

    function _redeemFulFillRequest() internal {}
}