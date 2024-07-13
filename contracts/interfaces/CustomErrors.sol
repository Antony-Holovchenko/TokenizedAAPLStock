// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

interface tkAAPLErrors {
    /** 
     * @dev Error indicates that user have requested to mint tkAAPL tokens
     * the amount of which is more than amount of the actual AAPL stocks in 
     * user portfolio. 
     * @param amountToMint - numder of tokens requested for minting.
     * @param portfolioBalance - value of the shares in USD on user exchange account. 
    */
    error tkAAPL_NotEnoughCollateral(uint256 amountToMint, uint256 portfolioBalance);

    /** 
     * @dev Error indicates that user requested 0 tokens for minting.
     * @param requestedAmountToMint - numder of tokens requested for minting.
    */
   error tkAAPL_Requested0TokenAmountToMint(uint256 requestedAmountToMint);
}