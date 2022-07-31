// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import {ERC1238} from './ERC1238.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract Product is ERC1238{
    using Counters for Counters.Counter;
    /// @notice Used as token ID
    /// @dev Starts from 1, since 0 can also mean that no token has been minted
    Counters.Counter private _nftCounter;

    address companyAddress;
    uint256 warrentyPeriod;

    /// @notice Maximum number of NFTs
    uint256 private totalStock;

    /// @notice Remaining number of NFTs
    uint256 private stock;

    /// @notice For locking in case there are less than `totalStock`
    bool private supplyEnded;

    mapping(address=>mapping(uint=>uint)) public mapWarrentyValidity;

    address[] customers;

    constructor(string memory _productName, string memory _companyName, uint256 _initialStock, address _companyAddress, uint256 _warrentyPeriod) ERC1238(_productName, _companyName) {
        totalStock = _initialStock;
        stock = _initialStock;
        companyAddress = _companyAddress;
        warrentyPeriod = _warrentyPeriod*31536000;
        supplyEnded = false;
    }

    modifier onlyOwner(){
        require(msg.sender == companyAddress,"Function accessible only by the owner !!");
        _;
    }

    function mintNFT(string memory tokenURI) public virtual returns (uint256){
        require(supplyEnded == false, 'No longer exists');
        require(_nftCounter.current() < totalStock,'No supply currently');

        _nftCounter.increment();
        stock-=1;

        ERC1238._mint(msg.sender, _nftCounter.current());
        ERC1238._setTokenURI(_nftCounter.current(), tokenURI);

        mapWarrentyValidity[msg.sender][_nftCounter.current()] = block.timestamp;
        
        customers.push(msg.sender);

        return _nftCounter.current();
    }

    /// Number of tokens minted or number of products purchased
    function mintedTokens() public view returns (uint256) {
        return _nftCounter.current();
    }

    // Total Stock
    function supplyLimit() public view returns (uint256) {
        return totalStock;
    }

    // Stock Left
    function remainingSupply() public view returns(uint256){
        return stock;
    }

    // Add Stock
    function addSupply(uint _stock) public onlyOwner{
        totalStock+=_stock;
    }

    // Is supply for this product ended or not?
    function ended() public view returns (bool) {
        return supplyEnded;
    }

    // End Supply
    function endSupply() public onlyOwner returns (bool) {
        require(supplyEnded == false, 'Supply has already ended');
        supplyEnded = true;
        return supplyEnded;
    }

    // Validity of a particular product
    function checkValidity(address _holderAddress) public view returns(bool){
        // require(block.timestamp<mapWarrentyValidity[_holder][_tokenId]+warrentyPeriod,"Your warrenty is expired, can burn your NFT");
        if(block.timestamp<mapWarrentyValidity[_holderAddress][ERC1238.tokenOf(_holderAddress)]+warrentyPeriod){
            return (true);
        }
        else{
            return (false);
        }
    }

    // Expiry date of a particular product
    function checkExpiryDate(address _holderAddress) public view returns(string memory, uint){
        // require(block.timestamp<mapWarrentyValidity[_holder][_tokenId]+warrentyPeriod,"Your warrenty is expired, can burn your NFT");
        if(block.timestamp<mapWarrentyValidity[_holderAddress][ERC1238.tokenOf(_holderAddress)]+warrentyPeriod){
            return ("Expires on:",mapWarrentyValidity[_holderAddress][ERC1238.tokenOf(_holderAddress)]+warrentyPeriod);
        }
        else{
            return ("Expired on:",mapWarrentyValidity[_holderAddress][ERC1238.tokenOf(_holderAddress)]+warrentyPeriod);
        }
    }

    // Can burn NFT only after the warrenty validity is over
    function burnNFT() public{
        require(block.timestamp>mapWarrentyValidity[msg.sender][ERC1238.tokenOf(msg.sender)]+warrentyPeriod,"Your warrenty is not expired yet, cannot burn your NFT");
        ERC1238._burn(ERC1238.tokenOf(msg.sender));
    }

}