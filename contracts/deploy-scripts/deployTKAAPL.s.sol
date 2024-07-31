// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;
import { tkAAPL } from "../tkAAPL.sol";

contract deployTKAAPL {
    string private mintSourceCode = "";
    string private sellSourceCode = "";
    uint64 constant subId = 3263;

    constructor(string memory _mintSourceCode, string memory _sellSourceCode) {
        mintSourceCode = _mintSourceCode;
        sellSourceCode = _sellSourceCode;
    }
    function run() external {
        deployTkAAPL(mintSourceCode, sellSourceCode, subId);
    }

    function deployTkAAPL(
        string memory _mintSourceCode, 
        string memory _sellSourceCode, 
        uint64 _subId
    ) 
        public 
        returns(tkAAPL) 
    {
        tkAAPL TKAAPL = new tkAAPL(_mintSourceCode, _sellSourceCode, _subId);
        return TKAAPL;
    }
}