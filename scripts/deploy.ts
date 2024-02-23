import { ethers } from "hardhat";

  // Example deployment script
async function main() {
  const Vault = await ethers.getContractFactory("Vault");
  const vault = await Vault.deploy(beneficiary.address, unlockTime);
  await vault.deployed();
  console.log("Vault deployed to:", vault.address);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});