// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Chainlink Functions imports
import {FunctionsClient} from "@chainlink/functions/contracts/dev/0_0_4/FunctionsClient.sol";
import {FunctionsRequest} from "@chainlink/functions/contracts/dev/0_0_4/libraries/FunctionsRequest.sol";

contract EFchainStudentSBT is ERC721URIStorage, Ownable, FunctionsClient {
    using FunctionsRequest for FunctionsRequest.Request;

    uint256 public nextTokenId;
    mapping(address => bool) public hasMinted;
    bytes32 public latestRequestId;
    string public latestResponse;

    event VerificationRequested(bytes32 requestId);
    event VerificationCompleted(string result);

    constructor(address oracle) ERC721("EFchain Student SBT", "EFSBT") Ownable(msg.sender) FunctionsClient(oracle) {}

    function mintSBT(string memory tokenURI) external {
        require(!hasMinted[msg.sender], "Already minted");
        uint256 tokenId = nextTokenId;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        hasMinted[msg.sender] = true;
        nextTokenId++;
    }

    function requestVerification(string memory milestone) public {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript("return args[0];");
        string ;
        args[0] = milestone;
        req.setArgs(args);

        // Adjust gas limit and don’t forget to fund your contract with LINK!
        bytes32 assignedReqID = _sendRequest(req.encodeCBOR(), 300000);
        latestRequestId = assignedReqID;
        emit VerificationRequested(assignedReqID);
    }

    // Chainlink Functions fulfill function
    function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory /* err */) internal override {
        latestResponse = string(response);
        emit VerificationCompleted(latestResponse);
    }

    // Prevent transfers - SBT logic
    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        address from = super._update(to, tokenId, auth);
        require(from == address(0), "SBTs are non-transferable");
        return from;
    }
}
