const BlankNFT_ERC = artifacts.require("BlankNFT_ERC721");
const UserCollection = artifacts.require("UserCollection");
const chai = require("chai");
const BN = web3.utils.BN;
chai.use(require("chai-bn")(BN));
const { expect } = chai;

contract("UserCollection", (accounts) => {
  const [deployer, user] = accounts;

  let blankNFT_ERCInstance1;
  let blankNFT_ERCInstance2;
  let UserCollectionInstance;
  beforeEach(async () => {
    UserCollectionInstance = await UserCollection.new({ from: deployer });
    blankNFT_ERCInstance1 = await BlankNFT_ERC.new(
      "Collection_URIs",
      "MyFirstNFT",
      "MFT",
      UserCollectionInstance.address,
      { from: user }
    );
    blankNFT_ERCInstance2 = await BlankNFT_ERC.new(
      "Collection_URIs",
      "MySecondNFT",
      "MST",
      UserCollectionInstance.address,
      { from: user }
    );
  });

  it("Contracts should be deployed", () => {
    expect(blankNFT_ERCInstance1.address).to.not.equal(0x0);
    expect(blankNFT_ERCInstance2.address).to.not.equal(0x0);
    expect(UserCollectionInstance.address).to.not.equal(0x0);
  });

  it("user Colletion should be created", async () => {
    const firstCreatedCollection =
      await UserCollectionInstance.collectionInfoByUser(user, 0);
    const secondCreatedCollection =
      await UserCollectionInstance.collectionInfoByUser(user, 1);
    expect(firstCreatedCollection.Nft).to.equal(blankNFT_ERCInstance1.address);
    expect(secondCreatedCollection.Nft).to.equal(blankNFT_ERCInstance2.address);
  });

  it("minted NFT should be in your collection", async () => {
    await blankNFT_ERCInstance1.mint("my first NFT URI for ID 1", {
      from: user,
    });
    await blankNFT_ERCInstance1.mint("my first NFT URI for ID 2", {
      from: user,
    });
    await blankNFT_ERCInstance1.mint("my first NFT URI for ID 3", {
      from: user,
    });
    const firstCreatedCollection =
      await UserCollectionInstance.collectionInfoByUser(user, 0);
    firstNFTInstance = await BlankNFT_ERC.at(firstCreatedCollection.Nft);
    const totalUserNFTs = await firstNFTInstance.balanceOf(user);
    expect(totalUserNFTs).to.be.bignumber.equal(new BN(3));
  });
});
