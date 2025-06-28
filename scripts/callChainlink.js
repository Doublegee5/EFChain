const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
  const Contract = await ethers.getContractFactory("EFchainStudentSBT");
  const contract = await Contract.attach(contractAddress);

  const tx = await contract.requestVerification("Milestone1");
  await tx.wait();

  console.log("✅ Chainlink request sent. Tx hash:", tx.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Script failed:", error);
    process.exit(1);
  });
