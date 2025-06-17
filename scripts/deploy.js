async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const EFchainStudentSBT = await ethers.getContractFactory("EFchainStudentSBT");
  const sbt = await EFchainStudentSBT.deploy(deployer.address);  // pass your address as initialOwner
  await sbt.deployed();

  console.log("EFchainStudentSBT deployed to:", sbt.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
