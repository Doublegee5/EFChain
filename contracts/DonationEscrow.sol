// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract DonationEscrow is Ownable {
    event DonationReceived(address indexed donor, uint256 amount);
    event Withdrawn(address indexed recipient, uint256 amount);

    constructor() Ownable(msg.sender) {}

    receive() external payable {
        emit DonationReceived(msg.sender, msg.value);
    }

    function donate() external payable {
        require(msg.value > 0, "Donation must be greater than zero");
        emit DonationReceived(msg.sender, msg.value);
    }

    function withdraw(address payable recipient, uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        recipient.transfer(amount);
        emit Withdrawn(recipient, amount);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
