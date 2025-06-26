// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./FunctionsRequest.sol";

abstract contract FunctionsClient {
    error OnlyRouterCanFulfill(address have, address want);

    address internal immutable i_router;

    constructor(address router) {
        i_router = router;
    }

    function _sendRequest(
        bytes memory req,
        uint64 subscriptionId,
        uint32 gasLimit
    ) internal returns (bytes32) {
        return IFunctionsRouter(i_router).sendRequest(req, subscriptionId, gasLimit);
    }

    function handleOracleFulfillment(bytes32 requestId, bytes memory response, bytes memory err) external {
        if (msg.sender != i_router) {
            revert OnlyRouterCanFulfill(msg.sender, i_router);
        }
        _fulfillRequest(requestId, response, err);
    }

    function _fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal virtual;
}

interface IFunctionsRouter {
    function sendRequest(bytes calldata req, uint64 subscriptionId, uint32 gasLimit) external returns (bytes32);
}
