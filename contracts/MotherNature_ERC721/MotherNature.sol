// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MotherNature is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    address payable public wallet;

    Counters.Counter private _tokenId;
    string private constant NFT_CID =
        "bafybeifaspbyztjiu3kv6h5ol3d4fatlbcc2ona5h7jq5smtfifowpxsla";
    string private baseURI;

    string private baseExtension = ".json";

    uint256 public price = 0.001 ether;
    uint256 public limit = 100;

    uint256 private timeToRevel;
    string public dummyURL =
        "https://bafkreihel6d5yxnbkeohllrn7bjcbjqrxp7vm7sufaghz55tummzqra7pq.ipfs.nftstorage.link/";

    constructor(
        string memory _name,
        string memory _symbol,
        address payable _wallet,
        string memory _nftsBaseURI,
        uint256 _timeToRevel
    ) ERC721(_name, _symbol) {
        wallet = _wallet;
        baseURI = _nftsBaseURI;
        timeToRevel = _timeToRevel;
    }

    receive() external payable {
        require(true, "Do not send Ether to me!");
    }

    function mint() public payable {
        require(_msgSender() != address(0), "Buyer's address must not be 0");
        require(msg.value == price, "0.001 ether must be paid to mint a NFT");
        require(_tokenId.current() <= limit, "All the NFTs are already minted");
        _tokenId.increment(); // Nfts's id starts at 1
        _safeMint(_msgSender(), _tokenId.current());
        wallet.transfer(msg.value);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        if (timeToRevel >= block.timestamp) {
            return dummyURL;
        }

        return
            bytes(baseURI).length > 0
                ? string(
                    abi.encodePacked(baseURI, tokenId.toString(), baseExtension)
                )
                : "";
    }

    function setPrice(uint256 _price) public onlyOwner {
        price = _price;
    }

    function setLimit(uint256 _limit) public onlyOwner {
        limit = _limit;
    }

    function setTimeToRevel(uint256 _timeToRevel) public onlyOwner {
        timeToRevel = _timeToRevel;
    }

    function getNFTCID() public view returns (string memory) {
        if (timeToRevel >= block.timestamp) {
            return "It is not the time to revel NFTS";
        }
        return NFT_CID;
    }

    function OwnersNfts(address _owner) public view returns (uint256[] memory) {
        uint256 ownerTotalNFTs = balanceOf(_owner);
        uint256[] memory ownedNFTlist = new uint256[](ownerTotalNFTs);
        for (uint256 i; i < ownerTotalNFTs; i++) {
            ownedNFTlist[i] = (tokenOfOwnerByIndex(_owner, i));
        }
        return ownedNFTlist;
    }

    function getOwnersNftsURIs(
        address _owner,
        uint256 _limit,
        uint256 _offset
    ) public view returns (string[] memory) {
        if (balanceOf(_owner) == 0) {
            return new string[](0);
        }
        uint256 size = _offset > _limit ? _limit : _offset;
        string[] memory ownedNFTsURIsList = new string[](size);
        uint256 ownedNFTId;

        string memory currentBaseURI = _baseURI();
        for (uint256 i = 0; i < size; i++) {
            ownedNFTId = (tokenOfOwnerByIndex(_owner, _offset - 1));
            ownedNFTsURIsList[i] = string(
                abi.encodePacked(
                    currentBaseURI,
                    ownedNFTId.toString(),
                    baseExtension
                )
            );
            --_offset;
        }

        return ownedNFTsURIsList;
    }

    function getLatestURI() public view returns (string memory) {
        string memory currentBaseURI = _baseURI();
        return
            string(
                abi.encodePacked(
                    currentBaseURI,
                    _tokenId.current().toString(),
                    baseExtension
                )
            );
    }
}
