const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with address:", deployer.address);

  const ContractFactory = await hre.ethers.getContractFactory("EFchainStudentSBT");
  const contract = await ContractFactory.deploy(); // No args here, unless your constructor needs it

  await contract.waitForDeployment(); // ✅ Ethers v6 method

  const address = await contract.getAddress(); // ✅ Ethers v6 method
  console.log("Contract deployed at:", address);
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
