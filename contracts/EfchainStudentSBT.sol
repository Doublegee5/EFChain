// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EFchainStudentSBT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    mapping(address => bool) public hasMinted;

    constructor() ERC721("EFchain Student SBT", "EFSBT") Ownable(msg.sender) {}

    function mintSBT(string memory tokenURI) external {
        require(!hasMinted[msg.sender], "Already minted");
        uint256 tokenId = nextTokenId;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        hasMinted[msg.sender] = true;
        nextTokenId++;
    }

    // Prevent transfers - SBT logic (OpenZeppelin 5.x uses _update)
    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        address from = super._update(to, tokenId, auth);
        require(from == address(0), "SBTs are non-transferable");
        return from;
    }
}
