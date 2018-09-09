const ERC721Badge = artifacts.require("./ERC721Badge.sol");

module.exports = async function(deployer) {
  await deployer.deploy(ERC721Badge, "SDG Badge", "BDG");
  const erc721 = await ERC721Badge.deployed()
};