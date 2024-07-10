// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

interface tkAAPLErrors {
    /** 
     * @dev Error indicates that user have requested to mint tkAAPL tokens
     * the amount of which is more than amount of the actual AAPL stocks in 
     * user portfolio. 
    */
    error tkAAPL_NotEnoughCollateral(uint256 amountToMint, uint256 portfolioBalance);
}