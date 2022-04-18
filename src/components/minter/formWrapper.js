import React, { useState } from "react";
import { ethers } from "ethers";
import FileInput from "./fileInput";
import TextInputs from "./textInputs";
import { Button, Stack, Collapse, Box, Spacer } from "@chakra-ui/react";

import { Web3Storage } from "web3.storage";
import NFTMINTER from "../../artifacts/contracts/NFT_Minter.sol/NFTMINTER.json";
import UploadingDisplay from "./uplodingDisplay";
import ErrorDisplay from "./errors";
import PolygonLogo from "../../img/polygon";

const Form = () => {
  //States
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [minterState, setMinterState] = useState(0);
  const [minterError, setMinterError] = useState(null);

  /// Storage
  ////////////////////////////////////////////
  const web3storage_token = process.env.REACT_APP_WEB3_STORAGE_TOKEN;
  const client = new Web3Storage({ token: web3storage_token });

  //  Contract & Ethers
  ////////////////////////////////////////////
  const contractAddress = "0xB4d5536C716E5Ca077bA415563170c92c0B63eE3";

  //  Ethers Functions
  ////////////////////////////////////////////
  const requestAccount = async () => {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return account;
  };

  const checkWallet = async (provider) => {
    let network;
    try {
      network = await provider.getNetwork();
    } catch (error) {
      setMinterError(error.code);
      return;
    }
    return network;
  };

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

  //  Navigation functions
  ////////////////////////////////////////////
  const backButtonClick = () => {
    setMinterState(0);
    setMinterError(null);
  };

  //  Minter
  ////////////////////////////////////////////
  const startMint = async () => {
    setMinterState(1);
    setMinterError(null);

    //Check if an ethereum wallet add on is Installed
    if (typeof window.ethereum === "undefined") {
      setMinterError("Please connect your MetaMask wallet");
      return;
    }

    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    //Check if wallet is connected
    const network = await checkWallet(provider);

    //check if the current network is correct
    if (network.chainId !== 80001) {
      setMinterError("Please use the polygone chain");
      //set network to polygon chain
      await selectNetwork();
    }
    setMinterState((count) => count + 1);
    //start uploading

    if (!uploadedFile) {
      let img_ipfs_address;

      try {
        img_ipfs_address = await client.put([file], {});
      } catch (error) {
        setMinterError(error.code);
        return;
      }

      setUploadedFile(img_ipfs_address);
    }

    //sign the transaction
    setMinterState((count) => count + 1);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      contractAddress,
      NFTMINTER.abi,
      signer
    );

    let transaction;
    try {
      transaction = await contract.mint(
        title,
        description,
        "ipfs://" + uploadedFile + "/" + file.name
      );
    } catch (error) {
      setMinterError(error.code);
      return;
    }

    //wait for transaction
    setMinterState((count) => count + 1);
    await transaction.wait();

    setMinterState((count) => count + 1);

    setFile(null);
  };

  return (
    <>
      <Box
        bg="rgba(0,0,0,0.5)"
        w="100%"
        color="black"
        maxW="lg"
        borderRadius="2xl"
        p={8}
        mb={-4}
      >
        <Collapse in={minterState < 1}>
          <Stack spacing={4}>
            <FileInput setFile={setFile} file={file} />
            <Collapse in={file !== null}>
              <Stack spacing={4}>
                <TextInputs
                  setTitle={setTitle}
                  setDescription={setDescription}
                />

                <Button
                  onClick={startMint}
                  bgGradient="linear(346deg, rgba(60,53,165,1) 0%, rgba(89,83,162,1) 100%)"
                  color="#fff"
                  size="lg"
                  _hover={{
                    bgGradient:
                      "linear(346deg, rgba(60,53,165,1) 0%, rgba(89,83,162,0.6244813278008299) 100%)",
                  }}
                >
                  MINT NFT
                </Button>
              </Stack>
            </Collapse>
          </Stack>
        </Collapse>

        <UploadingDisplay
          minterState={minterState}
          file={file}
          minterError={minterError}
        />

        <Collapse in={minterError !== null}>
          <ErrorDisplay
            backButtonClick={backButtonClick}
            selectNetwork={selectNetwork}
            minterError={minterError}
            startMint={startMint}
          />
        </Collapse>
      </Box>
      <Stack direction="row">
        <Spacer />

        <PolygonLogo />
      </Stack>
    </>
  );
};

export default Form;
