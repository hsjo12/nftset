// const Eevee = artifacts.require("Eevee");
// const chai = require("chai");
// const BN = web3.utils.BN;
// chai.use(require("chai-bn")(BN));
// const { expect } = chai;

// contract.only("Eevee", async (accounts) => {
//   const [owner, buyer, wallet] = accounts;

//   let eeveeInstance;
//   const JsonurIs =
//     "https://bafybeie3c5pdc7tngu5mvzgcagyao6w7aw2nipxdonp6mdz37kemjkxdnq.ipfs.nftstorage.link/";
//   beforeEach(async () => {
//     eeveeInstance = await Eevee.new(JsonurIs, wallet, "Dog", 123456789);
//   });

//   it("Eevee should be deployed", () => {
//     expect(eeveeInstance.address).to.not.equal(0x0);
//   });

//   it("Check if a pokemonBall is minted", async () => {
//     const pokemonBallId = await eeveeInstance.POKEMONBALL();
//     await eeveeInstance.mintPokemonBall({
//       from: buyer,
//       value: web3.utils.toWei("0.0001", "ether"),
//     });

//     const balanceOfBuyer = await eeveeInstance.balanceOf(buyer, pokemonBallId);
//     expect(balanceOfBuyer).to.be.bignumber.equal(new BN(1));
//   });

//   it.only("Check if a pokemonBall is open", async () => {
//     await eeveeInstance.mintPokemonBall({
//       from: buyer,
//       value: web3.utils.toWei("0.0001", "ether"),
//     });

//     const fireStoneId = await eeveeInstance.FIRESTONE();
//     const darkStoneId = await eeveeInstance.DARKSTONE();
//     const waterStoneId = await eeveeInstance.WATERSTONE();
//     const leafStoneId = await eeveeInstance.LEAFSTONE();
//     const eevee = await eeveeInstance.EEVEE();
//     const stoneIds = [
//       fireStoneId,
//       darkStoneId,
//       waterStoneId,
//       leafStoneId,
//       eevee,
//     ];
//     await eeveeInstance.openPokemonBall({
//       from: buyer,
//       value: web3.utils.toWei("0.0001", "ether"),
//     });
//     let balanceOfBuyer;
//     for (id of stoneIds) {
//       balanceOfBuyer = await eeveeInstance.balanceOf(buyer, id);
//       if (balanceOfBuyer.toString() === "1") {
//         console.log(`Obtained Id from a pokemon ball: ${id}`);
//         break;
//       }
//     }
//     expect(balanceOfBuyer).to.be.bignumber.equal(new BN(1));
//   });

//   it("Check if an eevee is evlouated from one of the stones", async () => {
//     const darkStoneId = await eeveeInstance.DARKSTONE();
//     const umbreonId = await eeveeInstance.UMBREON();

//     //Get all elements and a character only for the testing purpose
//     await eeveeInstance.test_GetAllStones(buyer, { from: owner });
//     // DARKSTONE(Id:1) + EEVEE(Id:5) = UMBREON (Id:6)
//     await eeveeInstance.evolveEevee(darkStoneId, {
//       from: buyer,
//       value: web3.utils.toWei("0.0001", "ether"),
//     });
//     const balanceOfBuyer = await eeveeInstance.balanceOf(buyer, umbreonId);
//     expect(balanceOfBuyer).to.be.bignumber.equal(new BN(1));
//   });
//   it("Check if eevee take the final evoluation ", async () => {
//     const finalEvoluationId = await eeveeInstance.SYLVEON();

//     //Get all elements and a character only for the testing purpose
//     await eeveeInstance.test_GetAllEevees(buyer, {
//       from: owner,
//     });

//     // WATER(Id:2) + CHARACTER(Id:5) = WATER_CHARACTER (Id:7)
//     await eeveeInstance.finalEvoluation({
//       from: buyer,
//       value: web3.utils.toWei("0.0001", "ether"),
//     });
//     const balanceOfBuyer = await eeveeInstance.balanceOf(
//       buyer,
//       finalEvoluationId
//     );
//     expect(balanceOfBuyer).to.be.bignumber.equal(new BN(1));
//   });
// });
