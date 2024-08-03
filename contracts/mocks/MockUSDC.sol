// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract testUSDC is ERC20 {
    constructor() ERC20("testUsdc", "TU") {}

    function mint() external {
        _mint(msg.sender, 1e6);
    }
}