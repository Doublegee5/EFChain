// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// ✅ Corrected import paths (local, not npm package)
import "./chainlink/functions/FunctionsClient.sol";
import "./chainlink/functions/FunctionsRequest.sol";

// ✅ Inherit from FunctionsClient
contract MilestoneVerifier is FunctionsClient {
    using Functions for Functions.Request;

    bytes32 public lastRequestId;
    bool public milestoneVerified;
    string public verificationDetails;

    event VerificationRequested(bytes32 indexed requestId);
    event VerificationCompleted(bool verified, string details);

    constructor(address oracle) FunctionsClient(oracle) {}

    function requestVerification(string calldata milestone) public {
        Functions.Request memory req;
        req.initializeRequest(
            Functions.Location.Inline,
            Functions.CodeLanguage.JavaScript,
            string.concat("verifyMilestone(\"", milestone, "\")")
        );
        lastRequestId = sendRequest(req, 100000); // gas limit
        emit VerificationRequested(lastRequestId);
    }

    // ✅ fulfillRequest: handles the response from Chainlink Functions
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        require(requestId == lastRequestId, "Invalid request ID");

        if (err.length > 0) {
            milestoneVerified = false;
            verificationDetails = string(err);
        } else {
            (bool verified, string memory details) = abi.decode(response, (bool, string));
            milestoneVerified = verified;
            verificationDetails = details;
        }

        emit VerificationCompleted(milestoneVerified, verificationDetails);
    }
}
