// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IVerifierProxy {
    /**
     * @notice Verifies that the data encoded has been signed
     * correctly by routing to the correct verifier, and bills the user if applicable.
     * @param payload The encoded data to be verified, including the signed
     * report.
     * @param parameterPayload fee metadata for billing. For the current implementation this is just the abi-encoded fee token ERC-20 address
     * @return verifierResponse The encoded report from the verifier.
     */
    function verify(
        bytes calldata payload,
        bytes calldata parameterPayload
    ) external payable returns (bytes memory verifierResponse);

    /**
     * @notice Bulk verifies that the data encoded has been signed
     * correctly by routing to the correct verifier, and bills the user if applicable.
     * @param payloads The encoded payloads to be verified, including the signed
     * report.
     * @param parameterPayload fee metadata for billing. For the current implementation this is just the abi-encoded fee token ERC-20 address
     * @return verifiedReports The encoded reports from the verifier.
     */
    function verifyBulk(
        bytes[] calldata payloads,
        bytes calldata parameterPayload
    ) external payable returns (bytes[] memory verifiedReports);

    // The feed ID is the first 32 bytes of the report data.

    receive() external payable;
}
