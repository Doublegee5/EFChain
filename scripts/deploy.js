const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("🚀 Deploying contracts with:", deployer.address);

  // ✅ Use correctly checksummed address from the console
  const oracleAddress = hre.ethers.utils.getAddress("0xc5ca5a9d7c1C1b2f38fcda2517da2e72ed0564");

  const Verifier = await hre.ethers.getContractFactory("MilestoneVerifier");
  const contract = await Verifier.deploy(oracleAddress);

  await contract.deployed();
  console.log("✅ MilestoneVerifier deployed to:", contract.address);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
