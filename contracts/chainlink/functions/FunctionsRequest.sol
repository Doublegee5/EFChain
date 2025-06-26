// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

library FunctionsRequest {
    struct Request {
        string source;
        bytes secrets;
        string[] args;
    }

    function encodeRequest(Request memory req) internal pure returns (bytes memory) {
        return abi.encode(req.source, req.secrets, req.args);
    }
}
