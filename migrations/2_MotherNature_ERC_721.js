const MotherNature = artifacts.require("MotherNature");

module.exports = async (deployer, network, accounts) => {
  let wallet = accounts[4];
  if (network !== "development") {
    wallet = "0xB2A3975114fD508F3BdAab3217b554Ed5ac6870f";
  }

  const currentDate = new Date();
  currentDate.setMinutes(currentDate.getMinutes() + 10); // After 10 mins from now
  const timeToRevel = await Math.floor(currentDate.getTime() / 1000);
  const JsonurIs =
    "https://bafybeiaxmwgsdgayar6xrreorqnazzg66nwocxxaojx37fktflt5bxmhwy.ipfs.nftstorage.link/";

  await deployer.deploy(
    MotherNature,
    "MotherNature",
    "MN",
    wallet,
    JsonurIs,
    timeToRevel
  );

  const mtInstance = await MotherNature.deployed();
  await mtInstance.mint({ value: web3.utils.toWei("0.001", "ether") });
};
