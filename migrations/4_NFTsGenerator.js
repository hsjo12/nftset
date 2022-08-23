const UserCollection = artifacts.require("UserCollection");
const BlankNFT_ERC721 = artifacts.require("BlankNFT_ERC721");
module.exports = async (deployer, network, accounts) => {
  await deployer.deploy(UserCollection);
  const instance = await UserCollection.deployed();
  // await deployer.deploy(
  //   BlankNFT_ERC721,
  //   "URI1",
  //   "AA1",
  //   "AA1",
  //   instance.address,
  //   { from: accounts[0] }
  // );
};
