// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import { Script } from "lib/forge-std/src/Script.sol";
import { tkAAPL } from "../contracts/tkAAPL.sol";

contract DeploytkAAPL is Script {

    string constant mintSourceCode = "./functions/sources/alpaca-balance-request.js";
    string constant sellSourceCode = "";

    function run() external {
        vm.startBroadcast();
        //deployTkAAPL();
        vm.stopBroadcast();
    }
}