const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with address:", deployer.address);

  const ContractFactory = await hre.ethers.getContractFactory("EFchainStudentSBT");
  const contract = await ContractFactory.deploy();

  await contract.waitForDeployment(); // ✅ Ethers v6 syntax
  console.log("Contract deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
