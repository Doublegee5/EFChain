const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  const oracleAddress = "0x..."; // 👈 Replace with your actual Chainlink router/oracle address
  const Verifier = await hre.ethers.getContractFactory("MilestoneVerifier");
  const contract = await Verifier.deploy(oracleAddress);

  await contract.deployed();
  console.log("MilestoneVerifier deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
