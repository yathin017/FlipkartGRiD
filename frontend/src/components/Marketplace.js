import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import { ethers } from "ethers";
import ContractContext from "../context/contractData/ContractContext";
import { create } from "ipfs-http-client";
const client = create("https://ipfs.infura.io:5001/api/v0");

const products = [
  {
    id: 1,
    name: "Gray Hoodie",
    price: "₹8,000",
    imageSrc:
      "https://atsymper.sirv.com/Images/gray-hoodie.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    color: "Black",
  },
  {
    id: 2,
    name: "iPhone",
    price: "₹1,00,000",
    imageSrc:
      "https://atsymper.sirv.com/Images/iphone.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
    color: "Black",
  },
  {
    id: 3,
    name: "iWatch",
    price: "₹56,500",
    imageSrc:
      "https://atsymper.sirv.com/Images/iwatch.jfif",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
    color: "Black",
  },
  {
    id: 4,
    name: "Mac Book",
    price: "₹380",
    imageSrc:
      "https://atsymper.sirv.com/Images/macbook.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
    color: "Black",
  },
];

const Marketplace = () => {
  const x = useContext(ContractContext);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const [mintedTokens, setMintedTokens] = useState(null);
  const [error, setError] = useState(null);
  const [uri, setUri] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // Burn NFT
  async function burnNFT() {
    try {
      await requestAccount();
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          productAddress0,
          x.Product.abi,
          signer
        );
        const transaction = await contract.burnNFT();
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

  // Mint-0
  const metaData0 = `{
    attributes: [
      {
        color: "${products[0].color}",
        price: "${products[0].price}",
        "product-id": ${products[0].id},
        "serial-number": ${mintedTokens + 1},
        "nft-number": ${mintedTokens + 1},
        Brand: "PUMA",
        Category: "Sports",
      },
    ],
    description: "${products[0].imageAlt}",
    image: "${imageUrl}",
    name: "${products[0].name}",
  }`;

  const productAddress0 = "0xad772C12465b58ddA3950b58F118828F474513c6";
  async function getNftCounter0() {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          productAddress0,
          x.Product.abi,
          provider
        );
        let Data = await contract.mintedTokens();
        const _number = Data;
        setMintedTokens(_number);
        console.log(`Minted Tokens: ${_number}`);
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet.");
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function metaToIpfs0() {
    if (window.ethereum) {
      const Image = `https://atsymper.sirv.com/Images/cricket-bat.jpg?text.0.text=%23${mintedTokens}&text.0.size=30&text.0.color=ff0000`;
      const addImage = await client.add(Image);
      const imageURL = `https://ipfs.infura.io/ipfs/${addImage.path}`;
      await setImageUrl(imageURL);
      console.log(imageURL);
      const Data = metaData0;
      const addData = await client.add(Data);
      const url = `https://ipfs.infura.io/ipfs/${addData.path}`;
      const URI = url;
      await setUri(URI);
      console.log(URI);
    }
  }
  async function setMint0() {
    try {
      await requestAccount();
      await getNftCounter0();
      await metaToIpfs0();
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          productAddress0,
          x.Product.abi,
          signer
        );
        if (uri != null && uri !== "") {
          const metadataURI = uri;
          const transaction = await contract.mintNFT(metadataURI, {
            gasLimit: 500000,
          });
          await transaction.wait();
        } else {
          console.log("Please try again!!!");
        }
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet.");
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

//   // Mint-1
//   const metaData1 = {
//     attributes: [
//       {
//         color: products[1].color,
//         price: products[1].price,
//         "product-id": products[1].id,
//         "serial-number": mintedTokens + 1,
//         "nft-number": mintedTokens + 1,
//       },
//     ],
//     description: products[1].imageAlt,
//     image: products[1].imageSrc,
//     name: products[1].name,
//   };
//   const productAddress1 = "";

//   // Mint-2
//   const metaData2 = {
//     attributes: [
//       {
//         color: products[2].color,
//         price: products[2].price,
//         "product-id": products[2].id,
//         "serial-number": mintedTokens + 1,
//         "nft-number": mintedTokens + 1,
//       },
//     ],
//     description: products[2].imageAlt,
//     image: products[2].imageSrc,
//     name: products[2].name,
//   };
//   const productAddress2 = "";

//   // Mint-3
//   const metaData3 = {
//     attributes: [
//       {
//         color: products[3].color,
//         price: products[3].price,
//         "product-id": products[3].id,
//         "serial-number": mintedTokens + 1,
//         "nft-number": mintedTokens + 1,
//       },
//     ],
//     description: products[3].imageAlt,
//     image: products[3].imageSrc,
//     name: products[3].name,
//   };
//   const productAddress3 = "";

  return (
    <>
      <Navbar />

      <div className="bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group ">
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 hover:scale-105">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div>
                  <h1 className="mt-2 text-2xl font-bold text-gray-700">
                    {product.name}
                  </h1>
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-xl font-bold text-gray-700">
                      {product.price}
                    </span>
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={setMint0}
                    >
                      Buy
                    </button>
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={burnNFT}
                    >
                      Burn
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Marketplace;
