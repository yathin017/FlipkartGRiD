import ContractContext from "./ContractContext";
import Flipkart from "../../artifacts/contracts/Flipkart.sol/Flipkart.json"
import Company from "../../artifacts/contracts/Company.sol/Company.json"
import Category from "../../artifacts/contracts/Category.sol/Category.json"
import Product from "../../artifacts/contracts/Product.sol/Product.json"
const FlipkartAddress = "0xB5edFC5ceb2caBc8E9ec5F9c08B773e4067D5735";

const ContractState = (props)=>{
    return(
        <ContractContext.Provider value={{FlipkartAddress, Flipkart, Company, Category, Product}}>
            {props.children}
        </ContractContext.Provider>
    )
}

export default ContractState;