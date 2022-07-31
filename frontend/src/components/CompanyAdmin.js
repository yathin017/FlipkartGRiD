import { React, useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { ethers } from "ethers";
import ContractContext from "../context/contractData/ContractContext";

const CompanyAdmin = () => {
  const x = useContext(ContractContext);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // State Controlling
  const [companyState, setCompanyState] = useState(null);
  const [categoryState, setCategoryState] = useState(null);
  const [productState, setProductState] = useState(null);

  // Functions Handling
  // -> Create Category
  const [categoryName, setCategoryName] = useState(null);
  // -> Create Product
  const [productName, setProductName] = useState(null);
  const [initialStock, setInitialStock] = useState(null);
  const [warrentyPeriod, setWarrentyPeriod] = useState(null);
  // -> Add Supply
  const [supply, setSupply] = useState(null);
  // -> Check Validity
  const [addressValidity, setAddressValidity] = useState(null);
  const [getAddressValidity, setGetAddressValidity] = useState(null);
  // -> Check Expiry
  const [addressExpiry, setAddressExpiry] = useState(null);
  const [getAddressExpiry, setGetAddressExpiry] = useState(null);

  // Contract Address Handling
  // Company
  const [companyAddress, setCompanyAddress] = useState(null);
  // Category
  const [categoryAddress, setCategoryAddress] = useState(null);
  // Product
  const [productAddress, setProductAddress] = useState(null);

  // Error
  const [error, setError] = useState(null);

  // Functions
  // Getter
  // -> Get Company Address
  async function getCompanyAddress() {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          x.FlipkartAddress,
          x.Flipkart.abi,
          provider
        );
        let Data = await contract.companyAddresses(companyState);
        const _companyAddress = Data;
        setCompanyAddress(_companyAddress);
        console.log(_companyAddress);
        console.log(`Company State: ${companyState}`);
        console.log(`Company Address: ${companyAddress}`);
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet.");
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // -> Get Category Address
  async function getCategoryAddress() {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          companyAddress,
          x.Company.abi,
          provider
        );
        let Data = await contract.categoryAddresses(categoryState);
        const _categoryAddress = Data;
        setCategoryAddress(_categoryAddress);
        console.log(_categoryAddress);
        console.log(`Category State: ${categoryState}`);
        console.log(`Category Address: ${categoryAddress}`);
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet.");
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // -> Get Product Address
  async function getProductAddress() {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          categoryAddress,
          x.Category.abi,
          provider
        );
        let Data = await contract.productAddresses(parseInt(productState));
        const _productAddress = Data;
        setProductAddress(_productAddress);
        console.log(_productAddress);
        console.log(`Product State: ${productState}`);
        console.log(`Product Address: ${productAddress}`);
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet.");
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // -> Get Validity
  async function getValidity() {
    try {
      await getProductAddress();
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          productAddress,
          x.Product.abi,
          provider
        );
        let Data = await contract.checkValidity(addressValidity);
        setGetAddressValidity(Data.toString());
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet.");
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // -> Get Expiry
  async function getExpiry() {
    try {
      await getProductAddress();
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          productAddress,
          x.Product.abi,
          provider
        );
        let Data = await contract.checkExpiryDate(addressExpiry);
        setGetAddressExpiry(Data.toString());
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet.");
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Setter
  // -> Create Category
  async function setCategory() {
    try {
      await requestAccount();
      getCompanyAddress();
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          companyAddress,
          x.Company.abi,
          signer
        );
        const transaction = await contract.createCategory(
          categoryName.toString()
        );
        await transaction.wait();
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet.");
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // -> Create Product
  async function setProduct() {
    try {
      await requestAccount();
      getCategoryAddress();
      if (window.ethereum) {
        await getCategoryAddress();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          categoryAddress,
          x.Category.abi,
          signer
        );
        const transaction = await contract.createProduct(
          productName.toString(),
          parseInt(initialStock),
          parseInt(warrentyPeriod)
        );
        await transaction.wait();
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet.");
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // -> Add Supply
  async function setProductSupply() {
    try {
      await requestAccount();
      getProductAddress();
      if (window.ethereum) {
        await getProductAddress();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          productAddress,
          x.Product.abi,
          signer
        );
        const transaction = await contract.addSupply(parseInt(supply));
        await transaction.wait();
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet.");
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Automating Selection List
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // -> Get All Companies
  async function getAllCompanies() {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          x.FlipkartAddress,
          x.Flipkart.abi,
          provider
        );
        let Data = await contract.allCompanies();
        const _companies = Data;
        setCompanies(_companies);
        console.log(_companies);
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet.");
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // -> Get All Categories
  async function getAllCategories() {
    try {
      getCompanyAddress();
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          companyAddress,
          x.Company.abi,
          provider
        );
        let Data = await contract.allCategories();
        const _categories = Data;
        setCategories(_categories);
        console.log(_categories);
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet.");
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // -> Get All Products
  async function getAllProducts() {
    try {
      getCategoryAddress();
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          categoryAddress,
          x.Category.abi,
          provider
        );
        let Data = await contract.allProducts();
        const _products = Data;
        setProducts(_products);
        console.log(_products);
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet.");
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // -> Mint NFT
  // async function setMint() {
  //   try {
  //     await requestAccount();
  //     getProductAddress();
  //     if (window.ethereum) {
  //       await getProductAddress();
  //       const provider = new ethers.providers.Web3Provider(window.ethereum);
  //       const signer = provider.getSigner();
  //       const contract = new ethers.Contract(
  //         productAddress,
  //         x.Product.abi,
  //         signer
  //       );
  //       const metadataURI = "https://gateway.pinata.cloud/ipfs/QmbY8MoanoEHvMBPZfbSiAZNFuYirC5tJPveePQ24eEWej"
  //       const transaction = await contract.mintNFT(metadataURI,{
  //         gasLimit:500000,
  //       });
  //       await transaction.wait();
  //     } else {
  //       console.log("Ethereum object not found, install Metamask.");
  //       setError("Please install a MetaMask wallet.");
  //       console.log(error);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    getAllCompanies();
    getAllProducts();
    getAllCategories();
  });

  return (
    <>
      <Navbar />
      <div className="py-5" />
      <div className="mt-10 px-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Select Company
              </h3>
              <div className="col-span-6 sm:col-span-3">
                <select
                  id="company"
                  name="company"
                  autoComplete="company-name"
                  placeholder="Company"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm hover:cursor-pointer"
                  onChange={async (e) => {
                    const selectedCompany = e.target.value;
                    setCompanyState(selectedCompany);
                    console.log(`Selected Company: ${selectedCompany}`);
                    // await getCompanyAddress();
                  }}
                >
                  <option value={null}>--Select--</option>
                  {companies.map((company) => (
                    <option key={company} value={companies.indexOf(company)}>
                      {company}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {companyState != null ? (
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <h6 className="text-md font-medium leading-6 text-gray-900">
                    Create Category
                  </h6>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="category-name"
                        className="block text-sm font-medium text-gray-700 py-1"
                      >
                        Category Name
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="category-name"
                        type="text"
                        placeholder="ex: Clothing, Sports, Shoes"
                        required
                        onChange={(e) => setCategoryName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={setCategory}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="py-5" />
      <div className="mt-10 px-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          {companyState != null ? (
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Select Category
                </h3>
                <div className="col-span-6 sm:col-span-3">
                  <select
                    id="category"
                    name="category"
                    autoComplete="category-name"
                    placeholder="category"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm hover:cursor-pointer"
                    onChange={(e) => {
                      const selectedCategory = e.target.value;
                      setCategoryState(selectedCategory);
                      console.log(`Selected Category: ${selectedCategory}`);
                      // await getAllProducts();
                    }}
                  >
                    <option value={null}>--Select--</option>
                    {categories.map((category) => (
                      <option
                        key={category}
                        value={categories.indexOf(category)}
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {categoryState != null ? (
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <h6 className="text-md font-medium leading-6 text-gray-900">
                    Create Product
                  </h6>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700 py-1"
                      >
                        Product Name
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="product-name"
                        type="text"
                        placeholder="ex: Black Shirt, Cricket Bat, Blue Shoes"
                        required
                        onChange={(e) => setProductName(e.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700 py-1"
                      >
                        Initial Stock
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="initial-stock"
                        type="number"
                        placeholder="ex: 1, 5, 10, 25, 100"
                        required
                        onChange={(e) => setInitialStock(e.target.value)}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Warrenty Period
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="warrenty-period"
                        type="number"
                        placeholder="in years"
                        required
                        onChange={(e) => setWarrentyPeriod(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={setProduct}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="py-5" />
      <div className="mt-10 px-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          {categoryState != null ? (
            <div className="md:col-span-1 pb-24">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Select Product
                </h3>
                <div className="col-span-6 sm:col-span-3">
                  <select
                    id="product"
                    name="product"
                    autoComplete="product-name"
                    placeholder="Product"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm hover:cursor-pointer"
                    onChange={(e) => {
                      const selectedProduct = e.target.value;
                      setProductState(selectedProduct);
                      console.log(`Selected Product: ${selectedProduct}`);
                    }}
                  >
                    <option value={null}>--Select--</option>
                    {products.map((product) => (
                      <option key={product} value={products.indexOf(product)}>
                        {product}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {productState != null ? (
            <div className="mt-5 md:mt-0 md:col-span-2 pb-10">
              <div className="shadow overflow-hidden pb-10 sm:rounded-md">
                <div className="px-4 bg-white sm:p-6">
                  <h6 className="text-md font-medium leading-6 text-gray-900">
                    Add Supply
                  </h6>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <input
                        className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="add-supply"
                        type="Number"
                        placeholder="ex: 1, 5, 10, 25, 100"
                        required
                        onChange={(e) => setSupply(e.target.value)}
                      />
                    </div>
                    <div className="px-4 bg-gray-50 text-right sm:px-6">
                      <button
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={setProductSupply}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>

                <div className="px-4 bg-white sm:p-6">
                  <h6 className="text-md font-medium leading-6 text-gray-900">
                    Check Validity
                  </h6>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <input
                        className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="check-validity"
                        type="text"
                        placeholder="ex: 0x12345..."
                        required
                        onChange={(e) => setAddressValidity(e.target.value)}
                      />
                    </div>
                    <div className="px-4 bg-gray-50 text-right sm:px-6">
                      <button
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={getValidity}
                      >
                        Submit
                      </button>
                    </div>
                    <div id="check-validity">{getAddressValidity}</div>
                  </div>
                </div>

                <div className="px-4 bg-white sm:p-6">
                  <h6 className="text-md font-medium leading-6 text-gray-900">
                    Check Expiry
                  </h6>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <input
                        className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="check-expiry"
                        type="text"
                        placeholder="ex: 0x12345..."
                        required
                        onChange={(e) => setAddressExpiry(e.target.value)}
                      />
                    </div>
                    <div className="px-4 bg-gray-50 text-right sm:px-6">
                      <button
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={getExpiry}
                      >
                        Submit
                      </button>
                    </div>
                    <div id="check-expiry">{getAddressExpiry}</div>
                  </div>
                </div>
                {/* <div className="px-4 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    
                    <div className="flex-row px-2 bg-gray-50 text-right sm:px-6">
                      <button
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={setMint}
                      >
                        Mint
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default CompanyAdmin;
