const { ethers } = require("hardhat");
const { items } = require("../src/items.json");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {

  const [deployer] = await ethers.getSigners();

  // Deploy Chainazon
  const Chainazon = await ethers.getContractFactory("Chainazon");
  const chainazon = await Chainazon.deploy();
  await chainazon.deployed();

  console.log(`Deployed Chainazon Contract at: ${chainazon.address}\n`);

  // Listing items...
  for (let i = 0; i < items.length; i++) {
    const transaction = await chainazon
      .connect(deployer)
      .list(
        items[i].id,
        items[i].name,
        items[i].category,
        items[i].image,
        tokens(items[i].price),
        items[i].rating,
        items[i].stock
      );

    await transaction.wait();

    console.log(`Listed item ${items[i].id}: ${items[i].name}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
