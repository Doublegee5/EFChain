const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with address:", deployer.address);

  const Contract = await hre.ethers.getContractFactory("EFchainStudentSBT");
  const contract = await Contract.deploy();

  await contract.deployed();
  console.log("EFchainStudentSBT deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
