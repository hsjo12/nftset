// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface IBlankNFT_ERC721 {
    function getGetURIs(address _user) external view returns (string[] memory);

    function getCreator() external view returns (address);
}

contract UserCollection {
    struct CollectionInfo {
        address Nft;
        address creator;
        string collectionURI;
        string name;
        string symbol;
    }

    mapping(address => bool) public isTheNFTInit;
    mapping(address => CollectionInfo[]) public collectionInfoByUser;

    function createCollection(
        address _Nft,
        address _creator,
        string memory collectionURI,
        string memory _name,
        string memory _symbol
    ) external {
        (
            !isTheNFTInit[_Nft],
            "The collection for this nft was already created"
        );
        isTheNFTInit[_Nft] = true;
        collectionInfoByUser[_creator].push(
            CollectionInfo(_Nft, _creator, collectionURI, _name, _symbol)
        );
    }

    function getUserCollection(
        address _owner,
        uint256 _limit,
        uint256 _offset
    ) public view returns (CollectionInfo[] memory) {
        uint256 totalCollection = collectionInfoByUser[_owner].length;
        if (totalCollection == 0) {
            return new CollectionInfo[](0);
        }
        uint256 size = _offset > _limit ? _limit : _offset;
        CollectionInfo[] memory ownedCollectionList = new CollectionInfo[](
            size
        );

        for (uint256 i = 0; i < size; i++) {
            ownedCollectionList[i] = collectionInfoByUser[_owner][_offset - 1];
            --_offset;
        }

        return ownedCollectionList;
    }

    function totalCollectionOf(address _user) public view returns (uint256) {
        return collectionInfoByUser[_user].length;
    }

    function getUserNFTsUris(address _userNFT, address _user)
        public
        view
        returns (string[] memory)
    {
        return IBlankNFT_ERC721(_userNFT).getGetURIs(_user);
    }
}
