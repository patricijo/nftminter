import create from "zustand";
import { ReactComponent as ETHIcon } from "../node_modules/cryptocurrency-icons/svg/color/eth.svg";
import { ReactComponent as BNBIcon } from "../node_modules/cryptocurrency-icons/svg/color/bnb.svg";
import { ReactComponent as MATICIcon } from "../node_modules/cryptocurrency-icons/svg/color/matic.svg";
import { ReactComponent as CROIcon } from "../node_modules/cryptocurrency-icons/svg/color/mco.svg";

export const useStore = create((set) => ({
  currentChain: null,
  setCurrentChain: (newChain) => set(() => ({ currentChain: newChain })),

  mint: false,
  toggleMint: () => set((prev) => ({ mint: !prev.mint })),

  clear: false,
  toggleClear: () => set((prev) => ({ clear: !prev.clear })),

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
      marketLink: "https://testnets.opensea.io/assets/ropsen",
      price: 0.00025,
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
      price: 0.0017,
    },
    tMATIC: {
      name: "Polygon",
      icon: MATICIcon,
      testnet: true,
      decimals: 18,
      chainIdHex: "0x13881",
      chainId: 80001,
      rpcUrls:
        "https://speedy-nodes-nyc.moralis.io/b7c7b3c0a96fe1e767ef518e/polygon/mumbai",
      chainName: "Matic Mumbai",
      blockExplorerUrls: "https://explorer-mumbai.maticvigil.com/",
      contract: "0x4fDAca1458076a382F0ef1f494Eb0b92c6A763A7",
      method: "wallet_addEthereumChain",
      marketName: "opensea.io",
      marketLink: "https://testnets.opensea.io/assets/mumbai/",
      price: 0.069,
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
      price: 0.25,
    },
  },
}));

export const minterStates = create((set) => ({}));
