const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  // ✅ Correct checksum address from Chainlink documentation for Sepolia
  const oracleAddress = "0xCc5cA5A9dC7C1C1B2f38fCdA2517Da2e72eD0564";

  const Verifier = await hre.ethers.getContractFactory("MilestoneVerifier");
  const contract = await Verifier.deploy(oracleAddress);

  await contract.deployed();
  console.log("✅ MilestoneVerifier deployed to:", contract.address);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
