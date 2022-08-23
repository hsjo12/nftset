// const MatherNature = artifacts.require("MatherNature");
// const chai = require("chai");
// const BN = web3.utils.BN;
// chai.use(require("chai-bn")(BN));
// const { expect } = chai;
// contract("MatherNature", (accounts) => {
//   [deployer, buyer, wallet] = accounts;
//   let matherNatureInstance;
//   beforeEach(async () => {
//     const currentDate = new Date();
//     currentDate.setMinutes(currentDate.getMinutes() + 10); // After 10 mins from now
//     const timeToRevel = await Math.floor(currentDate.getTime() / 1000);
//     matherNatureInstance = await MatherNature.new(
//       "MotherNature",
//       "MN",
//       wallet,
//       "",
//       timeToRevel
//     );
//   });

//   it("MatherNature should be deployed", () => {
//     expect(matherNatureInstance.address).to.not.equal(0x0);
//   });

//   it.only("Mint", async () => {
//     let beforeWalletBalance = await web3.eth.getBalance(wallet);
//     await matherNatureInstance.mint({
//       from: buyer,
//       value: web3.utils.toWei("0.001", "ether"),
//     });
//     const afterWalletBalance = await web3.eth.getBalance(wallet);
//     const earning = web3.utils.toWei("0.001", "ether");
//     const ownerNFTlist = await matherNatureInstance.OwnersNfts(buyer);

//     beforeWalletBalance = new BN(beforeWalletBalance).add(new BN(earning));
//     expect(beforeWalletBalance).to.be.bignumber.equal(afterWalletBalance);
//     expect(ownerNFTlist[0]).to.be.bignumber.equal(new BN(1));
//   });
// });
