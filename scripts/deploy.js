const hre = require("hardhat");

async function main() {
  const SBT = await hre.ethers.getContractFactory("EFchainStudentSBT");
  const sbt = await SBT.deploy();
  await sbt.deployed();
  console.log("EFchainStudentSBT deployed to:", sbt.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
