import React, { useEffect, useState } from "react";

import { ethers } from "ethers";
import { Web3Storage } from "web3.storage";

import NFTMINTER from "../../artifacts/contracts/NFT_Minter.sol/NFTMINTER.json";

import MinterDisplay from "./minterDisplay";
import { Box, Collapse, Stack } from "@chakra-ui/react";
import { useMinterStore } from "./minterStore";
import { useStore } from "../../store";

import MintedDisplay from "./mintedDisplay";

const Minter = () => {
  const [ready, setReady] = useState(false);

  const { chains, toggleClear, mint, toggleMint } = useStore();

  const {
    NFTData,
    setNFTData,
    addMinterState,
    changeMinterStateStatus,
    changeLastMinterStateStatus,
    resetMinterState,
  } = useMinterStore();

  // const minterState = useMinterStore((state) => state.minterStates);
  //const addMinterState = useMinterStore((state) => state.addMinterState);
  //const removeMinterState = useMinterStore((state) => state.removeMinterState);

  /// Storage
  ////////////////////////////////////////////
  const web3storage_token = process.env.REACT_APP_WEB3_STORAGE_TOKEN;
  const client = new Web3Storage({ token: web3storage_token });

  //  Ethers Functions
  ////////////////////////////////////////////
  const selectNetwork = async (currentChain) => {
    if (chains[currentChain].method !== "wallet_switchEthereumChain") {
      return await window.ethereum.request({
        method: chains[currentChain].method,
        params: [
          {
            chainId: chains[currentChain].chainIdHex,
            rpcUrls: [chains[currentChain].rpcUrls],
            chainName: chains[currentChain].chainName,
            nativeCurrency: {
              name: chains[currentChain].name,
              symbol: currentChain,
              decimals: 18,
            },
            blockExplorerUrls: [chains[currentChain].blockExplorerUrls],
          },
        ],
      });
    }
    return await window.ethereum.request({
      method: chains[currentChain].method,
      params: [
        {
          chainId: chains[currentChain].chainIdHex,
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

  const cancelMint = () => {
    setReady(false);

    resetMinterState();
    setNFTData(null);
  };
  const resetMint = () => {
    resetMinterState();
    startMint();
  };
  ////////////////////////////////////////////////
  /////////////// MINTER
  ////////////////////////////////////////////////
  const startMint = async () => {
    try {
      let newNFTData = "";
      addMinterState({
        id: "cyw",
        text: "Connecting your Wallet...",
        state: "loading",
      });

      const acc = await requestAccount();
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let network = await provider.getNetwork();

      if (network.chainId !== chains[NFTData.chain].chainId) {
        addMinterState({
          id: "psyn",
          text: `Please select the ${chains[NFTData.chain].name} Network...`,
          state: "loading",
        });
        await selectNetwork(NFTData.chain);
        provider = new ethers.providers.Web3Provider(window.ethereum);
        network = await provider.getNetwork();
      }
      if (network.chainId !== chains[NFTData.chain].chainId) {
        changeLastMinterStateStatus("err");
        throw new Error("We could not connect to the Network.");
      }
      changeLastMinterStateStatus("checked");

      changeMinterStateStatus("cyw", "checked");

      addMinterState({
        id: "uyi",
        text: "Uploading your Image...",
        state: "loading",
      });

      let img_ipfs_address = await client.put([NFTData.file], {});
      /* 
      setUploadedFile({
        ipfs: img_ipfs_address,
        filename: encodeURI(NFTData.file.name),
      }); */
      newNFTData = NFTData;
      newNFTData.ipfs = img_ipfs_address;
      newNFTData.filename = encodeURI(NFTData.file.name);

      img_ipfs_address = img_ipfs_address + "/" + encodeURI(NFTData.file.name);
      changeMinterStateStatus("uyi", "checked");

      addMinterState({
        id: "pstt",
        text: "Please sign the transaction...",
        state: "loading",
      });

      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        chains[NFTData.chain].contract,
        NFTMINTER.abi,
        signer
      );

      let price = NFTData.quantity * chains[NFTData.chain].price;
      const transaction = await contract.mint(
        NFTData.title,
        NFTData.description,
        img_ipfs_address,
        NFTData.quantity,
        {
          value: ethers.utils.parseEther(price.toString()),
        }
      );
      contract.on("Minted", (from, tokenId) => {
        //BUG: After cancel to old token will be returned
        console.log("contract event", from, tokenId);
        if (from.toLowerCase() === acc[0]) {
          newNFTData.tokenId = tokenId.toNumber();
        }
      });
      setNFTData(newNFTData);
      changeMinterStateStatus("pstt", "checked");

      addMinterState({
        id: "myn",
        text: "Minting your NFT...",
        state: "loading",
      });
      await transaction.wait();

      changeMinterStateStatus("myn", "checked");

      setReady(true);
    } catch (error) {
      console.log(error);
      changeLastMinterStateStatus("err");

      if (error.code === "-32603") {
        addMinterState({
          id: "-32000",
          text: "insufficient funds",
          state: "error",
        });
      } else {
        addMinterState({
          id: error.code,
          text: error.message,
          state: "error",
        });
      }
    }

    toggleClear();
  };

  useEffect(() => {
    if (mint === true) {
      startMint();
      toggleMint();
    }
  }, [mint]);

  useEffect(() => {
    if (NFTData && NFTData.chain) {
      const contract = new ethers.Contract(
        chains[NFTData.chain].contract,
        NFTMINTER.abi
      );

      requestAccount().then((acc) => {
        let newNFTData;
        contract.on("Minted", (from, tokenId) => {
          //BUG: After cancel to old token will be returned
          console.log("contract event", from, tokenId);
          if (from.toLowerCase() === acc[0]) {
            newNFTData.tokenId = tokenId.toNumber();
            setNFTData(newNFTData);
            console.log("token ID", tokenId);
          }
        });
      });
    }
  }, [NFTData]);

  return (
    <>
      <Box p={2}>
        <Stack spacing={2}>
          <Collapse in={ready === false}>
            <Stack spacing={4}>
              <MinterDisplay cancelMint={cancelMint} resetMint={resetMint} />
            </Stack>
          </Collapse>
          <Collapse in={ready === true}>
            {" "}
            <MintedDisplay chains={chains} cancelMint={cancelMint} />
          </Collapse>
        </Stack>
      </Box>
    </>
  );
};

export default Minter;
