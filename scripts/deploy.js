// scripts/deploy.js

const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with address:", deployer.address);

  const ContractFactory = await hre.ethers.getContractFactory("EFchainStudentSBT");
  const contract = await ContractFactory.deploy(); // deploy the contract

  await contract.waitForDeployment(); // <-- replaces contract.deployed()

  console.log("Contract deployed at:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
