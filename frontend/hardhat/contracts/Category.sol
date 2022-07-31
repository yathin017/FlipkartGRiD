// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./Product.sol";

contract Category{
    string public companyName;
    string public categoryName;
    address public companyAddress;
    Product[] public productAddresses;
    string[] public products;
    
    constructor(string memory _companyName, string memory _categoryName, address _categoryAddress){
        companyName = _companyName;
        categoryName = _categoryName;
        companyAddress = _categoryAddress;
    }

    modifier onlyOwner(){
        require(msg.sender == companyAddress,"Function accessible only by the owner !!");
        _;
    }

    function createProduct(string memory _productName, uint256 _initialStock, uint256 _warrentyPeriod) public onlyOwner{
        Product product = new Product(_productName, companyName, _initialStock, companyAddress, _warrentyPeriod);
        productAddresses.push(product);
        products.push(_productName);
    }
    
    function allProductAddresses()public view returns (Product[] memory){
        return productAddresses;
    }

    function allProducts()public view returns (string[] memory){
        string[] memory _data = new string[](products.length);
        for(uint _index=0; _index<products.length; _index++){
            _data[_index] = products[_index];
        }
        return (_data);
    }

}