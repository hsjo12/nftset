// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

interface IUserCollection {
    function createCollection(
        address _Nft,
        address _creator,
        string memory collectionURI,
        string memory _name,
        string memory _symbol
    ) external;
}

contract BlankNFT_ERC721 is ERC721Enumerable {
    using Strings for uint256;
    uint256 public id;
    mapping(uint256 => string) private tokenURIs;
    address private creator;
    string private baseExtension = ".json";

    constructor(
        string memory _collectionURI,
        string memory _name,
        string memory _symbol,
        address _userNFTsBox
    ) ERC721(_name, _symbol) {
        id = 1;
        creator = msg.sender;
        IUserCollection(_userNFTsBox).createCollection(
            address(this),
            creator,
            _collectionURI,
            _name,
            _symbol
        );
    }

    function getCreator() external view returns (address) {
        return creator;
    }

    function mint(string memory _uri) public {
        _safeMint(msg.sender, id);
        setTokenURI(id, _uri);
        id++;
    }

    function setTokenURI(uint256 _id, string memory _uri) public {
        require(_exists(_id), "ERC721URIStorage: URI set of nonexistent token");
        require(ownerOf(_id) == msg.sender, "You are not an owner");
        require(
            bytes(tokenURIs[_id]).length == 0,
            "You have already set up the token URI"
        );
        tokenURIs[_id] = _uri;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return "Created From NFTs";
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        return bytes(tokenURIs[tokenId]).length > 0 ? tokenURIs[tokenId] : "";
    }

    function getURIs(address _user) external view returns (string[] memory) {
        uint256 totalNFTs = balanceOf(_user);
        string[] memory userNFTsURIs = new string[](totalNFTs);

        for (uint256 i = 0; i < userNFTsURIs.length; i++) {
            userNFTsURIs[i] = tokenURI(tokenOfOwnerByIndex(msg.sender, i));
        }
        return userNFTsURIs;
    }

    // function OwnersNftsURIs(address _owner, uint _limit, uint _offset) public view returns(string[] memory) {
    //         if(balanceOf(_owner)==0){
    //             return new string[](0);
    //         }
    //         uint untillThisIndex = _limit+_offset > balanceOf(_owner) ? balanceOf(_owner) : _limit+_offset;

    //         uint size = _limit+_offset > balanceOf(_owner) ?  balanceOf(_owner) - _offset : _limit;
    //         string[] memory ownedNFTsURIsList = new string[](size);
    //         uint ownedNFTId;

    //         uint index = 0;
    //         while(_offset<untillThisIndex){
    //             ownedNFTId=(tokenOfOwnerByIndex(_owner,_offset));
    //             ownedNFTsURIsList[index] =  tokenURIs[ownedNFTId];
    //             ++_offset;
    //             ++index;
    //         }
    //         return ownedNFTsURIsList;
    // }
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

        for (uint256 i = 0; i < size; i++) {
            ownedNFTId = (tokenOfOwnerByIndex(_owner, _offset - 1));
            ownedNFTsURIsList[i] = tokenURIs[ownedNFTId];
            --_offset;
        }

        return ownedNFTsURIsList;
    }

    function getLatestURI() public view returns (string memory) {
        return tokenURIs[id];
    }
}
