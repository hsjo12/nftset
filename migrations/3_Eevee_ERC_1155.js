const Eevee = artifacts.require("Eevee");

module.exports = async (deployer, network, accounts) => {
  let wallet = accounts[4];
  if (network !== "development") {
    wallet = "0xB2A3975114fD508F3BdAab3217b554Ed5ac6870f";
  }
  const JsonurIs =
    "https://bafybeifupvtkmcng6nms5fhgzdemwpxoz3dzw5ddg7fiolwrzqlhjscv7m.ipfs.nftstorage.link/";
  await deployer.deploy(Eevee, JsonurIs, wallet, "Dog", 123456789);

  const instance = await Eevee.deployed();
  await instance.test_getAll(accounts[0]);
};
