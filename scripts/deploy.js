const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  const oracleAddress = hre.ethers.utils.getAddress("0xCc5cA5A9dC7C1C1b2F38fcda2517Da2e72ED564");
  const Contract = await hre.ethers.getContractFactory("EFchainStudentSBT");
  const contract = await Contract.deploy(oracleAddress);

  await contract.deployed();
  console.log("✅ EFchainStudentSBT deployed to:", contract.address);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
