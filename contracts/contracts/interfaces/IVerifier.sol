// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IVerifier {
    function verify(
        bytes calldata signedReport
    ) external payable returns (bytes memory verifierResponse);

    // The feed ID is the first 32 bytes of the report data.

    receive() external payable;
}
