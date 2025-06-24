const { ethers } = require("hardhat");

async function main() {
  // 1. Get contract address and ABI
  const contractAddress = "YOUR_CONTRACT_ADDRESS";
  const Contract = await ethers.getContractFactory("EFchainStudentSBT"); // or your contract name

  // 2. Attach to the deployed contract
  const contract = await Contract.attach(contractAddress);

  // 3. Call the Chainlink function request on the contract
  console.log("Sending Chainlink request...");
  const tx = await contract.requestVerification("Milestone1");
  await tx.wait();

  console.log("Chainlink request sent. Tx hash:", tx.hash);

  // 4. Optionally, listen for the fulfillment event
  contract.on("VerificationCompleted", (verified, details) => {
    console.log("Verification result:", verified, details);
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
