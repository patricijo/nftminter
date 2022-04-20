import create from "zustand";

const useStore = create((set) => ({
  NFTData: null,
  setNFTData: (data) => set((state) => ({ NFTData: data })),
}));

export default useStore;
