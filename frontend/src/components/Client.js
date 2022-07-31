import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import ContractContext from "../context/contractData/ContractContext";


const Client = () => {
  const x = useContext(ContractContext);

  const [nfts, setNfts] = useState([]);

  async function getNftData() {
    const response = await fetch(
      `https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:0xDB1E5Bb0b0b380e75bc65Aa9271cC9748Ac7F9Ca`
    );
    // const response = await fetch(`https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:${x.account}`);
    const data = await response.json();
    setNfts(data.items);
    console.log(data.items);
  }

  useEffect(() => {
    getNftData();
  }, []);

  return (
    <>
      <Navbar />

      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {nfts.map((nft, index) => (
              <div key={index} className="group ">
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 hover:scale-105">
                  <img
                    src={nft.meta.content.url}
                    alt={nft.meta.description}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="break-all">
                  <h1 className="mt-2 text-sm font-bold text-gray-700">
                    {nft.meta.name}
                  </h1>
                  <h6 className="mt-2 text-sm text-gray-700">
                    <p>{nft.contract}</p>
                  </h6>
                  <h6 className="mt-2 text-sm text-gray-700">
                    <p>{nft.meta.description}</p>
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Client;
