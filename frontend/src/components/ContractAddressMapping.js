import { ethers } from "ethers";
import React, { useContext, useState } from "react";
import logo from "../assets/logo.svg";
import ContractContext from "../context/contractData/ContractContext";

const ContractAddressMapping = () => {
  const x = useContext(ContractContext);

  const [error, setError] = useState(null);

  // States
  const [companyState, setCompanyState] = useState(null);
  const [categoryState, setCategoryState] = useState(null);
  const [productState, setProductState] = useState(null);

  // Contract Address
  const [companyAddress, setCompanyAddress] = useState(null);
  const [categoryAddress, setCategoryAddress] = useState(null);
  const [productAddress, setProductAddress] = useState(null);

  // Mapping
  const [company, setCompany] = useState(null);
  const [category, setCategory] = useState(null);
  const [product, setProduct] = useState(null);
  const [customer, setCustomer] = useState(null);

  // Button State
  const [categoryButtonState, setCategoryButtonState] = useState(null);
  const [productButtonState, setProductButtonState] = useState(null);
  const [customerButtonState, setCustomerButtonState] = useState(null);

  async function getCompanyNameAddress() {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          x.FlipkartAddress,
          x.Flipkart.abi,
          provider
        );
        let DataName = await contract.allCompanies();
        let DataAddress = await contract.allCompanyAddresses();
        let Data = [];
        for (let i = 0; i < DataName.length; i++) {
          await Data.push([DataName[i], DataAddress[i]]);
        }
        await setCompany(Data);
        console.log(Data);
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet.");
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getCategoryNameAddress() {
    try {
      if (window.ethereum) {
        const providerx = new ethers.providers.Web3Provider(window.ethereum);
        const contractx = new ethers.Contract(
          x.FlipkartAddress,
          x.Flipkart.abi,
          providerx
        );
        const ContractAddressData = await contractx.companyAddresses(
          companyState
        );
        setCompanyAddress(ContractAddressData);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          companyAddress,
          x.Company.abi,
          provider
        );
        setCategoryButtonState(1);
        let DataName = await contract.allCategories();
        let DataAddress = await contract.allCategoryAddresses();
        let Data = [];
        for (let i = 0; i < DataName.length; i++) {
          await Data.push([DataName[i], DataAddress[i]]);
        }
        await setCategory(Data);
        console.log(Data);
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet.");
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getProductNameAddress() {
    try {
      if (window.ethereum) {
        const providerx = new ethers.providers.Web3Provider(window.ethereum);
        const contractx = new ethers.Contract(
          companyAddress,
          x.Company.abi,
          providerx
        );
        const ContractAddressData = await contractx.productAddresses(
          categoryState
        );
        setCategoryAddress(ContractAddressData);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          categoryAddress,
          x.Product.abi,
          provider
        );
        setProductButtonState(1);
        let DataName = await contract.allProducts();
        let DataAddress = await contract.allProductAddresses();
        let Data = [];
        for (let i = 0; i < DataName.length; i++) {
          await Data.push([DataName[i], DataAddress[i]]);
        }
        await setProduct(Data);
        console.log(Data);
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet.");
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   getCompanyNameAddress();
  // });

  return (
    <div className="min-h-full flex items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 flex flex-col items-center">
        <div className="flex flex-col">
          <img className="mx-auto h-12 w-auto" src={logo} alt="Workflow" />
          <h2 className="mt-6 mb-2 text-center text-3xl font-extrabold text-gray-900">
            Contract Address Mappings
          </h2>
          <button
            className="group relative justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={getCompanyNameAddress}
          >
            Company Addresses
          </button>
        </div>

        {company != null ? (
          <>
            <h4 className="mt-2 text-center text-2xl font-bold text-gray-900">
              Company Addresses
            </h4>
            <table className="shadow-lg bg-white border-separate">
              <tr>
                <th className="bg-blue-100 border text-left px-8 py-4">
                  Company
                </th>
                <th className="bg-blue-100 border text-left px-8 py-4">
                  Contract Address
                </th>
              </tr>
              {company != null
                ? company.map((comp) => (
                    <tr>
                      <td
                        className="border px-8 py-4"
                        key={comp[0]}
                        value={company.indexOf(comp)}
                      >
                        {comp[0]}
                      </td>
                      <td
                        className="border px-8 py-4"
                        key={comp[1]}
                        value={company.indexOf(comp)}
                      >
                        {comp[1]}
                      </td>
                    </tr>
                  ))
                : ""}
            </table>
            <div className="flex px-aut0 h-10">
              <select
                id="category"
                name="category"
                autoComplete="category-name"
                placeholder="category"
                className="mt-1 block w-full mx-2 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm hover:cursor-pointer"
                onChange={(e) => {
                  const selectedCompany = e.target.value;
                  setCompanyState(selectedCompany);
                  setCategory([1, 2]);
                  console.log(`Selected Company: ${companyState}`);
                }}
              >
                <option value={null}>--Select--</option>
                {company.map((comp) => (
                  <option key={comp} value={company.indexOf(comp)}>
                    {comp[0]}
                  </option>
                ))}
              </select>
              <button
                className="group relative justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={getCategoryNameAddress}
              >
                Category
              </button>
            </div>
          </>
        ) : (
          ""
        )}
        {categoryButtonState != null ? (
          <>
            <h4 className="mt-2 text-center text-2xl font-bold text-gray-900">
              Category Addresses
            </h4>
            <table className="shadow-lg bg-white border-separate">
              <tr>
                <th className="bg-blue-100 border text-left px-8 py-4">
                  Category
                </th>
                <th className="bg-blue-100 border text-left px-8 py-4">
                  Contract Address
                </th>
              </tr>
              {category.map((comp) => (
                <tr>
                  <td
                    className="border px-8 py-4"
                    key={comp[0]}
                    value={category.indexOf(comp)}
                  >
                    {comp[0]}
                  </td>
                  <td
                    className="border px-8 py-4"
                    key={comp[1]}
                    value={category.indexOf(comp)}
                  >
                    {comp[1]}
                  </td>
                </tr>
              ))}
            </table>
            <div className="flex px-aut0 h-10">
              <select
                id="category"
                name="category"
                autoComplete="category-name"
                placeholder="category"
                className="mt-1 block w-full mx-2 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm hover:cursor-pointer"
                onChange={(e) => {
                  const selectedCategory = e.target.value;
                  setCategoryState(selectedCategory);
                  console.log(`Selected Category: ${selectedCategory}`);
                }}
              >
                <option value={null}>--Select--</option>
                {product.map((comp) => (
                  <option key={comp} value={product.indexOf(comp)}>
                    {comp[0]}
                  </option>
                ))}
              </select>
              <button
                className="group relative justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={getProductNameAddress}
              >
                Product
              </button>
            </div>
          </>
        ) : (
          ""
        )}
        {productButtonState != null ? (
          <>
            <h4 className="mt-2 text-center text-2xl font-bold text-gray-900">
              Product Addresses
            </h4>
            <table className="shadow-lg bg-white border-separate">
              <tr>
                <th className="bg-blue-100 border text-left px-8 py-4">
                  Company
                </th>
                <th className="bg-blue-100 border text-left px-8 py-4">
                  Contract Address
                </th>
              </tr>
              {product.map((comp) => (
                <tr>
                  <td
                    className="border px-8 py-4"
                    key={comp}
                    value={product.indexOf(comp)}
                  >
                    {comp[0]}
                  </td>
                  <td
                    className="border px-8 py-4"
                    key={comp}
                    value={product.indexOf(comp)}
                  >
                    {comp[1]}
                  </td>
                </tr>
              ))}
            </table>
            <div className="flex px-aut0 h-10">
              <select
                id="category"
                name="category"
                autoComplete="category-name"
                placeholder="category"
                className="mt-1 block w-full mx-2 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm hover:cursor-pointer"
                onChange={(e) => {
                  const selectedProduct = e.target.value;
                  setProductState(selectedProduct);
                  console.log(`Selected Product: ${selectedProduct}`);
                }}
              >
                <option value={null}>--Select--</option>
                {product.map((comp) => (
                  <option key={comp} value={product.indexOf(comp)}>
                    {comp[0]}
                  </option>
                ))}
              </select>
              <button
                className="group relative justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                // onClick={getCompanyAddress}
              >
                Customer
              </button>
            </div>
          </>
        ) : (
          ""
        )}
        {customerButtonState != null ? (
          <>
            <h4 className="mt-2 text-center text-2xl font-bold text-gray-900">
              Customer Addresses
            </h4>
            <table className="shadow-lg bg-white border-separate">
              <tr>
                <th className="bg-blue-100 border text-left px-8 py-4">
                  Company
                </th>
                <th className="bg-blue-100 border text-left px-8 py-4">
                  Contract Address
                </th>
              </tr>
              {customer.map((comp) => (
                <tr>
                  <td
                    className="border px-8 py-4"
                    key={comp}
                    value={customer.indexOf(comp)}
                  >
                    {comp}
                  </td>
                </tr>
              ))}
            </table>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ContractAddressMapping;
