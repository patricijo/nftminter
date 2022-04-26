import create from "zustand";
import { ReactComponent as ETHIcon } from "../node_modules/cryptocurrency-icons/svg/color/eth.svg";
import { ReactComponent as BNBIcon } from "../node_modules/cryptocurrency-icons/svg/color/bnb.svg";
import { ReactComponent as MATICIcon } from "../node_modules/cryptocurrency-icons/svg/color/matic.svg";
import { ReactComponent as CROIcon } from "../node_modules/cryptocurrency-icons/svg/color/mco.svg";

export const useStore = create((set) => ({
  currentChain: null,
  setCurrentChain: (newChain) => set(() => ({ currentChain: newChain })),

  gas: 25000,

  chains: {
    tETH: {
      name: "Ethereum (Ropsten)",
      icon: ETHIcon,
      testnet: true,
      decimals: 18,
      chainIdHex: "0x3",
      chainId: 3,
      rpcUrls: "https://ropsten.infura.io/v3/",
      chainName: "Ropsten Testnet",
      blockExplorerUrls: "https://ropsten.etherscan.io",
      contract: "",
      method: "wallet_switchEthereumChain",
      marketName: "Opensea.io",
      marketLink: "Opensea.io",
      price: 1,
    },
    tBSC: {
      name: "Binance Smart Chain",
      icon: BNBIcon,
      testnet: true,
      decimals: 18,
      chainIdHex: "0x61",
      chainId: 97,
      rpcUrls: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainName: "BNB Smart Chain Testnet",
      blockExplorerUrls: "https://testnet.bscscan.com/",
      contract: "",
      method: "wallet_addEthereumChain",
      marketName: "Opensea.io",
      marketLink: "Opensea.io",
      price: 1,
    },
    tMATIC: {
      name: "Polygon",
      icon: MATICIcon,
      testnet: true,
      decimals: 18,
      chainIdHex: "0x13881",
      chainId: 80001,
      rpcUrls: "https://rpc-mainnet.matic.network/",
      chainName: "Matic Mumbai",
      blockExplorerUrls: "https://explorer-mumbai.maticvigil.com/",
      contract: "0x419348C2cc4cdAFB4b13e533b89379Ab4e84e6DA",
      method: "wallet_addEthereumChain",
      marketName: "opensea.io",
      marketLink: "https://testnets.opensea.io/assets/mumbai/",
      price: 25000,
    },
    CRO: {
      name: "Cronos",
      icon: CROIcon,
      testnet: false,
      decimals: 18,
      chainIdHex: "0x19",
      chainId: 25,
      rpcUrls: "https://evm-cronos.crypto.org",
      chainName: "Cronos Mainnet",
      blockExplorerUrls: "https://evm-cronos.crypto.org",
      contract: "",
      method: "wallet_addEthereumChain",
      marketName: "Opensea.io",
      marketLink: "Opensea.io",
      price: 1,
    },
  },
}));

export const minterStates = create((set) => ({}));
