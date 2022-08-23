// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
contract Eevee is Ownable,ERC1155("") {
    

    uint public constant POKEMONBALL = 0;
    uint public constant FIRESTONE = 1;
    uint public constant DARKSTONE = 2;
    uint public constant WATERSTONE = 3;
    uint public constant LEAFSTONE = 4;
    uint public constant EEVEE = 5;
    uint public constant FLAREON = 6;
    uint public constant UMBREON = 7;
    uint public constant VAPOREAN = 8;
    uint public constant LEAFEON = 9;
    uint public constant SYLVEON = 10;





    address payable public wallet; 
    uint public pokemonBallLimit = 1000;

    uint private number;
    string private key1;
    uint private key2;

    string private baseURI;
    string private baseExtension = ".json";
    
    uint[] private burnAllSet = [FLAREON,UMBREON,VAPOREAN,LEAFEON];
    uint[] private burnAllSetAmount = [1,1,1,1];
    uint public finalNftNum;
    using Strings for uint256;

    uint256[] private test_pokemonList = [POKEMONBALL,FIRESTONE,DARKSTONE,WATERSTONE,LEAFSTONE,EEVEE,FLAREON,UMBREON,VAPOREAN,LEAFEON,SYLVEON];
    uint256[] private test_amountList = [1,1,1,1,1,1,1,1,1,1,1];


    constructor(string memory _baseURI,address payable _wallet, string memory _key1, uint _key2) {
        wallet = _wallet;
        baseURI =_baseURI;
        key1 = _key1;
        key2 = _key2;
    }

    receive() external payable {
        require(true,"Do not send Ether to me!");
    }

    function mintPokemonBall() public payable  {
        require(_msgSender() != address(0), "Buyer's address must not be 0");
        require(0.0001 ether == msg.value, "The Price must be 0.0001 ether." );
        _mint(_msgSender(),POKEMONBALL,1,"");
        wallet.transfer(msg.value);
    }
    
    function openPokemonBall() public payable {
        require(_msgSender() != address(0), "Buyer's address must not be 0.");
        require(0.0001 ether == msg.value, "The Price must be 0.0001 ether." );
        _burn(_msgSender(),POKEMONBALL,1);
        _mint(_msgSender(),getRandom(),1,"");
        wallet.transfer(msg.value);
    }


    function evolveEevee(uint _id) public payable {
        require(_msgSender() != address(0), "Buyer's address must not be 0.");
        require(0.0001 ether == msg.value, "The Price must be 0.001 ether." );
        _burn(_msgSender(),EEVEE,1);
        _burn(_msgSender(),_id,1);
        _mint(_msgSender(),(EEVEE+_id),1,"");
        wallet.transfer(msg.value);
    } 
    
    function finalEvoluation() public payable {
        require(finalNftNum < 4, "Only 3 Nfts are available");
        require(_msgSender() != address(0), "Buyer's address must not be 0.");
        require(0.0001 ether == msg.value, "The Price must be 0.001 ether." );
         finalNftNum =  finalNftNum + 1;
        _burnBatch(_msgSender(),burnAllSet,burnAllSetAmount);
        _mint(_msgSender(),SYLVEON,1,"");
       
        wallet.transfer(msg.value);
    } 

    function changeSecrets(string memory _key1, uint _key2) public onlyOwner() {
        key1 = _key1;
        key2 = _key2;
    }

    //give a random number between 1 and 5

    function getRandom() internal view returns(uint) {
        uint randomNum = uint(keccak256(abi.encode(key1))) + key2 + uint256(keccak256(abi.encode(msg.sender)))/(block.timestamp) + (block.number);
        randomNum = (randomNum - ((randomNum/10)*10)) + 1;
        if(randomNum>5) {
            return randomNum - 5;
        }else {
            return randomNum;
        }
    }
    function uri(uint _tokenId) public view override returns (string memory) {
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, _tokenId.toString(), baseExtension)) : "";
    
    }

    function setWallet(address payable _wallet) public onlyOwner() {
        wallet = _wallet;
    }

    function test_getAll(address _receiver) public onlyOwner() {
        finalNftNum =  finalNftNum + 1;//for sylveon
        _mintBatch(_receiver,test_pokemonList,test_amountList,"");
 
    }
    
}
