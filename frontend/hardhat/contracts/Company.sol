// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./Category.sol";

contract Company{
    string public companyName;
    address public companyAddress;
    Category[] public categoryAddresses;
    string[] public categories;
    
    constructor(string memory _companyName, address _companyAddress){
        companyName = _companyName;
        companyAddress = _companyAddress;
    }

    modifier onlyOwner(){
        require(msg.sender == companyAddress,"Function accessible only by the owner !!");
        _;
    }

    function createCategory(string memory _categoryName) public onlyOwner{
        Category category = new Category(companyName, _categoryName, companyAddress);
        categoryAddresses.push(category);
        categories.push(_categoryName);
    }
    
    function allCategoryAddresses()public view returns (Category[] memory){
        return categoryAddresses;
    }

    function allCategories()public view returns (string[] memory){
        string[] memory _data = new string[](categories.length);
        for(uint _index=0; _index<categories.length; _index++){
            _data[_index] = categories[_index];
        }
        return (_data);
    }

    function changeBrandName(string memory _newCompanyName) public onlyOwner{
        companyName = _newCompanyName;
    }

}