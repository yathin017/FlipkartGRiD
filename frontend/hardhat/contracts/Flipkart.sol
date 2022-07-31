// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./Company.sol";

contract Flipkart{
    string public Name;
    address public flipkartAddress;
    Company[] public companyAddresses;
    string[] public companies;
    
    constructor(){
        Name = "Flipkart";
        flipkartAddress = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == flipkartAddress,"Function accessible only by the owner !!");
        _;
    }

    function createCompany(string memory _companyName, address _companyAddress) public onlyOwner{
        Company company = new Company(_companyName, _companyAddress);
        companyAddresses.push(company);
        companies.push(_companyName);
    }
    
    function allCompanyAddresses()public view returns (Company[] memory){
        return companyAddresses;
    }

    function allCompanies()public view returns (string[] memory){
        string[] memory _data = new string[](companies.length);
        for(uint _index=0; _index<companies.length; _index++){
            _data[_index] = companies[_index];
        }
        return (_data);
    }

}