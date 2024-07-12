// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";
import {tkAAPLErrors} from "../contracts/interfaces/CustomErrors.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract tkAPPL is ConfirmedOwner, FunctionsClient, tkAAPLErrors, ERC20 {

    using FunctionsRequest for FunctionsRequest.Request;
    
    enum MintOrSell {
        mint,
        redeem
    }

    // Struct to store sendMintRequest details
    struct AAPLRequest {
        uint256 requestedTokenAmount;
        address requester;
        MintOrSell mintOrSell;
    }

    address private constant FUNCTIONS_ROUTER = 0xb83E47C2bC239B3bf370bc41e1459A34b41238D0;
    bytes32 private constant DON_ID = 0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000;
    uint256 private constant DECIMALS = 1e18;
    uint64 private immutable subscriptionId;
    string private requestSourceCode;
    uint32 private constant GAS_LIMIT = 300000;
    uint256 private portfolioBalance;

    // Mapping storing each request details for each specific request id
    mapping(bytes32 requestId => AAPLRequest request) private requests;

    constructor(string memory _requestSourceCode, uint64 _subscriptionID) 
        ConfirmedOwner(msg.sender) 
        FunctionsClient(FUNCTIONS_ROUTER)
        ERC20( ) 
    {
        requestSourceCode = _requestSourceCode;
        subscriptionId = _subscriptionID;
    }

    /**
     * @notice User send a request for minting an tkAAPL token.
     * @dev Send an HTTP request to Chainlink. Function will send 2 txs.
     * 1st tx will send a request to Chainlink node, to check the shares balance of the user.
     * 2nd tx will do a callback to the APPL contract and do a token minting throght the "_mintFulfillRequest"  
     * if user balance is enough for this.
     * @param _amount - number of tokens for minting. 
     */
    function sendMintRequest(uint256 _amount) external onlyOwner returns(bytes32) {
        FunctionsRequest.Request memory req; // this is our data object
        req.initializeRequestForInlineJavaScript(requestSourceCode);
        bytes32 requestId = _sendRequest( //sends a Chainlink Functions request to the stored router address
            req.encodeCBOR(), // "encodeCBOR()" function encodes data into CBOR encoded bytes, so that Chainlink node will understand our data
            subscriptionId,
            GAS_LIMIT,
            DON_ID
        );
        requests[requestId] = AAPLRequest(
            _amount,
            msg.sender,
            MintOrSell.mint
        );
        return requestId;
    }

    /**
     * @notice User send a request to sell AAPL token for USDC.
     * @dev Chainlink will send a call to the exchange app, and do the next operations:
     * 1. Sell AAPL share on the exchange.
     * 2. Buy USDC on the exchange.
     * 4. Send USDC to this smart contract. 
     */
    function sendSellRequest() external {
        
    }

    /**
     * @notice Return the amount of AAPL value(in USD) stored on the user exchange account.
     * If user have enough AAPL shares, then we'll mint a tkAAPL token.
     * @dev After calling "sendMintRequest" function, the Chainlink node will return a response
     * with user exchange account balance, which will be used in this function.
     * If AAPL balance > txAAPL we want to mint --> then mint.
     * @param _requestId - id of the request to Chainlink.
     * @param _response - response object from Chainlink with data.
     */
    function _mintFulfillRequest(bytes32 _requestId, bytes memory _response) internal {
        uint256 amountToMint = requests[_requestId].requestedTokenAmount;
        portfolioBalance = uint256(bytes32(_response));

        // Total amount of tokens to mint should be < portfolioBalance
        if(_getCollateralBalance(amountToMint) > portfolioBalance) {
            revert tkAAPL_NotEnoughCollateral(amountToMint, portfolioBalance);
        }
    }

    function _sellFulfillRequest(bytes32 _requestId, bytes memory _response) internal {}

    /**
     * @dev After sending a mint/sell request, Chainlink will always 
     * respond with a callback to the fullFillRequest func.
     * @param _requestId - request id 
     * @param _response - response 
     */
    function fulfillRequest(bytes32 _requestId, bytes memory _response, bytes memory /* err */) 
        internal 
        override 
    {
        if (requests[_requestId].mintOrSell == MintOrSell.mint) {
            _mintFulfillRequest(_requestId, _response);
        } else {
            _sellFulfillRequest(_requestId, _response);
        }
    }

    function _getCollateralBalance(uint256 _amountOfTokensToMint) internal view returns(uint256) {
        uint256 calculatedNewTotalValue = getCalculatedNewTotalValue(_amountOfTokensToMint);
    }

    /**
     * @dev Calculate the total value(in USD) of all tkAAPL tokens. Combining the totalSupply 
     * together with the requested amount of tokens for mint and price of the AAPL share.
     * At least this newly calculated total value should be on the user exchange account to
     * mint the requested amount of tokens. 
     * @param _addedTokens - tokens amount which is requested for mint. 
     */
    function getCalculatedNewTotalValue(uint256 _addedTokens) internal view returns (uint256) {
        // (10tokens + 5 tokens to mint) * AAPL share price(200) = 3000$
        return ((totalSupply() + _addedTokens) * getAaplSharePrice()) / DECIMALS;
    }
}