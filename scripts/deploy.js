// scripts/deploy.js
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with account:', deployer.address);

  const MilestoneVerifier = await ethers.getContractFactory('MilestoneVerifier');
  // Replace with the Chainlink Functions Oracle contract address for your network
  const oracleAddress = '0xYourChainlinkFunctionsOracleAddressHere';

  const verifier = await MilestoneVerifier.deploy(oracleAddress);
  await verifier.deployed();

  console.log('MilestoneVerifier deployed at:', verifier.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
