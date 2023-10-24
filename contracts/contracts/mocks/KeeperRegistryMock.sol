// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {KeeperCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/interfaces/KeeperCompatibleInterface.sol";
import {ILogAutomation, Log} from "@chainlink/contracts/src/v0.8/automation/interfaces/ILogAutomation.sol";

contract KeeperRegistryMock {
    enum Trigger {
        CONDITION,
        LOG
    }

    bytes4 internal constant CHECK_SELECTOR =
        KeeperCompatibleInterface.checkUpkeep.selector;
    bytes4 internal constant PERFORM_SELECTOR =
        KeeperCompatibleInterface.performUpkeep.selector;

    bytes4 internal constant CHECK_LOG_SELECTOR =
        ILogAutomation.checkLog.selector;

    struct SwapStruct {
        address recipient;
        address tokenIn;
        address tokenOut;
        uint256 amountIn;
    }

    function performUpkeep(address upkeep) public {
        bytes[] memory signedReports = new bytes[](4);

        address recipient = address(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
        address tokenIn = address(0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3);
        address tokenOut = address(0x8FB1E3fC51F3b789dED7557E680551d93Ea9d892);
        uint256 amountIn = 0.001 ether;

        SwapStruct memory demo = SwapStruct(
            recipient,
            tokenIn,
            tokenOut,
            amountIn
        );
        signedReports[
            0
        ] = hex"00063ed9f4aa3c0bd13c602966f7d257a1bf50e4605eac15a26cb48684fc187f0000000000000000000000000000000000000000000000000000000004cbad07000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000001e00000000000000000000000000000000000000000000000000000000000000240000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e000023496426b520583ae20a66d80484e0fc18544866a5b0bfee15ec77196327400000000000000000000000000000000000000000000000000000000653588240000000000000000000000000000000000000000000000000000000065358824000000000000000000000000000000000000000000000000000037874f834e70000000000000000000000000000000000000000000000000002582acc085964c000000000000000000000000000000000000000000000000000000006536d9a40000000000000000000000000000000000000000000000000000002622905bd000000000000000000000000000000000000000000000000000000000000000020db51550c5b76a79e0b28e45e52569568f6596f019e1ae104c787c7fc39955c4bd5e82cac2c3205e7fbea0f85042e1287b6d5db4f19026ba4cc9916027222db80000000000000000000000000000000000000000000000000000000000000002593e5c49e71c75c74651475a3dc27cc99aa06e4497a4fb9ce02006f4341b89ff0c0e6c1137c10aad71beb6779abf61385b7a17d28885448b22f55cf9a35f297a";

        bytes memory extraData = abi.encode(demo);
        bytes memory performData = abi.encode(signedReports, extraData);
        KeeperCompatibleInterface(upkeep).performUpkeep(performData);
    }
}
