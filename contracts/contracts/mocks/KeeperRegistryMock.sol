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

    function performUpkeep(address upkeep, bytes memory performData) public {
        KeeperCompatibleInterface(upkeep).performUpkeep(performData);
    }
}
