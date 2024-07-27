// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;
import { tkAAPL } from "../contracts/tkAAPL.sol";

contract DeploytkAAPL {

    string constant mintSourceCodePath = "./functions/sources/alpaca-balance-request.js";
    string constant sellSourceCodePath = "";
    uint64 constant subId = 3263;

    function run() external {
        /* string memory mintSourceCode = vm.readFile(mintSourceCodePath);
        string memory sellSourceCode = vm.readFile(sellSourceCodePath);

        // vm.startBroadcast and vm.stopBroadcast are used to simulate tx execution.
        vm.startBroadcast();
        deployTkAAPL(mintSourceCode, sellSourceCode, subId);
        vm.stopBroadcast(); */
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