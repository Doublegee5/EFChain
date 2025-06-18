const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with address:", deployer.address);

  const ContractFactory = await hre.ethers.getContractFactory("EFchainStudentSBT");
  const contract = await ContractFactory.deploy();

  // ethers v6: use waitForDeployment()
  await contract.waitForDeployment();

  console.log("Contract deployed at:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
