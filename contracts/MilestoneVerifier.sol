// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@chainlink/contracts/src/v0.8/functions/FunctionsClient.sol";

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
        req.initializeRequest(Functions.Location.Inline, Functions.CodeLanguage.JavaScript, string.concat("verifyMilestone(", milestone, ")"));
        lastRequestId = sendRequest(req, 100000); // gas limit
        emit VerificationRequested(lastRequestId);
    }

    function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
        require(requestId == lastRequestId, "Invalid request ID");
        if (err.length > 0) {
            milestoneVerified = false;
            verificationDetails = string(err);
        } else {
            // decode the response (expecting bool and string)
            (bool verified, string memory details) = abi.decode(response, (bool, string));
            milestoneVerified = verified;
            verificationDetails = details;
        }
        emit VerificationCompleted(milestoneVerified, verificationDetails);
    }
}
