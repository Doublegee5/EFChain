// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./chainlink/functions/FunctionsClient.sol";
import "./chainlink/functions/FunctionsRequest.sol";

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
        lastRequestId = _sendRequest(abi.encode(req), 0, 100000); // subscriptionId 0 for example, adjust as needed
        emit VerificationRequested(lastRequestId);
    }

    function _fulfillRequest(
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
