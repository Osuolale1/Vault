import { ethers } from "hardhat";

  // Example deployment script
async function main() {

  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  const Vault = await ethers.getContractFactory("Vault");

  const unlockTime = Math.floor(Date.now() / 1000) + 3600; // Set unlock time to 1 hour from now
  const heir = '0xE237eecD2dAB5530f18C50710e91B2d1047087bB';


  const vault = await Vault.deploy(heir, unlockTime, {
    value:  ethers.parseUnits("100", 18)
  });
  await vault.waitForDeployment();

  console.log("Vault deployed to:", vault.target);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
