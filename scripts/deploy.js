const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  // Use the EXACT output from getAddress() or the checksum tool
  const oracleAddress = "0xCc5Ca5A9dC7C1C1B2f38fCdA2517Da2e72Ed0564";

  const Verifier = await hre.ethers.getContractFactory("MilestoneVerifier");
  const contract = await Verifier.deploy(oracleAddress);

  await contract.deployed();
  console.log("✅ Contract deployed to:", contract.address);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
