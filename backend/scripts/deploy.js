const hre = require("hardhat");

async function main() {
  const contractFactory = await hre.ethers.getContractFactory("DataConsumerV3");
  const contract = await contractFactory.deploy();

  await contract.waitForDeployment(); // ✅ Ethers v6-compatible

  const address = await contract.getAddress(); // ✅ also updated in v6

  console.log("***** Contract deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
