// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DonationEscrow {
    address public student;
    address public donor;
    uint256 public totalAmount;
    uint256 public milestoneAmount;
    uint8 public milestones;
    uint8 public currentMilestone;

    constructor(
        address _student,
        address _donor,
        uint8 _milestones
    ) payable {
        require(msg.value > 0, "No funds sent");
        require(_milestones > 0, "Milestones must be > 0");
        student = _student;
        donor = _donor;
        totalAmount = msg.value;
        milestones = _milestones;
        milestoneAmount = msg.value / _milestones;
        currentMilestone = 0;
    }

    function verifyMilestone() external {
        // Will later integrate Chainlink Functions here
        require(currentMilestone < milestones, "All milestones completed");
        currentMilestone++;
        payable(student).transfer(milestoneAmount);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
