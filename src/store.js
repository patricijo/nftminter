import create from "zustand";

const useStore = create((set) => ({
  NFTData: { file: "", title: "", description: "" },
  setNFTData: (data) => set((state) => ({ NFTData: data })),
  setNFTfile: (file) => set((states) => ({ file: file })),
}));

export default useStore;
