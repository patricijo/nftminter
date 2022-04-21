import React, { memo, useEffect, useState } from "react";

import { ethers } from "ethers";
import { Web3Storage } from "web3.storage";

import NFTMINTER from "../../artifacts/contracts/NFT_Minter.sol/NFTMINTER.json";
import Error from "./errors";
import Status from "./status";
import { Stack } from "@chakra-ui/react";
import { zeroPad } from "ethers/lib/utils";

const Minter = ({ NFTData }) => {
  console.log("run minter.js");
  const [error, setError] = useState();
  const [status, setStatus, getStatus] = useState({});
  const [uploadedFile, setUploadedFile] = useState(null);

  /// Storage
  ////////////////////////////////////////////
  const web3storage_token = process.env.REACT_APP_WEB3_STORAGE_TOKEN;
  const client = new Web3Storage({ token: web3storage_token });

  //  Contract & Ethers
  ////////////////////////////////////////////
  const contractAddress = "0xB4d5536C716E5Ca077bA415563170c92c0B63eE3";

  //  Ethers Functions
  ////////////////////////////////////////////
  const selectNetwork = async () => {
    return await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x13881",
          rpcUrls: ["https://rpc-mainnet.matic.network/"],
          chainName: "Matic Mumbai",
          nativeCurrency: {
            name: "POLYGON Mumbai",
            symbol: "MATIC",
            decimals: 18,
          },
          blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com/"],
        },
      ],
    });
  };

  const requestAccount = async () => {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return account;
  };

  const handleAddStatus = async (s) => {
    const newStatus = status;
    newStatus[s.id] = s;
    setStatus(newStatus);

    setStatus((state) => {
      console.log(state); // "React is awesome!"

      return state;
    });
  };
  const handleChangeStatus = (s) => {
    const newStatus = status;
    newStatus[s.id].state = s.state;
    setStatus(newStatus);
  };

  const handleRemoveStatus = (s) => {
    const newStatus = { ...status };
    delete newStatus[s.id];
    setStatus(newStatus);
  };

  ////////////////////////////////////////////////
  /////////////// MINTER
  ////////////////////////////////////////////////
  const startMint = async () => {
    try {
      setStatus({});

      await handleAddStatus({
        id: "cyw",
        text: "Connecting Your Wallet...",
        state: "loading",
      });
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();

      if (network.chainId !== 80001) {
        await selectNetwork();
      }

      await handleAddStatus({
        id: "uyi",
        text: "Uploading your Image...",
        state: "loading",
      });

      if (!uploadedFile) {
        const img_ipfs_address = await client.put([NFTData.file], {});

        setUploadedFile(img_ipfs_address);
      }

      await handleChangeStatus({ id: "uyi", state: "checked" });

      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        NFTMINTER.abi,
        signer
      );

      const transaction = await contract.mint(
        NFTData.title,
        NFTData.description,
        "ipfs://" + uploadedFile + "/" + NFTData.file.name
      );

      await transaction.wait();

      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    startMint();
  }, []);
  return (
    <>
      <Stack>
        <Status status={status} />

        <Error error={error} />
      </Stack>
    </>
  );
};

export default Minter;
