// scripts/deploy.js

const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with address:", deployer.address);

  const ContractFactory = await hre.ethers.getContractFactory("EFchainStudentSBT");
  const contract = await ContractFactory.deploy(); // Deploy the contract

  await contract.waitForDeployment(); // Correct way to wait for deployment in Ethers v6

  console.log("Contract deployed at:", await contract.getAddress()); // Ethers v6 syntax
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
