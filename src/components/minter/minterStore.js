import create from "zustand";

export const useMinterStore = create((set) => ({
  NFTData: null,
  setNFTData: (data) => {
    set((prev) => ({ NFTData: data }));
    console.log(data);
  },

  minterStates: [],

  addMinterState: (newState) => {
    console.log("add a state", newState);
    set((state) => ({
      minterStates: [...state.minterStates, newState],
    }));
  },

  removeMinterState: (id) => {
    set((state) => ({
      minterStates: state.minterStates.filter((s) => s.id !== id),
    }));
  },

  changeMinterStateStatus: (id, status) => {
    console.log("change statuse", id);
    console.log("...", status);
    set((state) => ({
      minterStates: state.minterStates.map((s) =>
        s.id === id ? { ...s, state: status } : s
      ),
    }));
  },

  changeLastMinterStateStatus: (status) => {
    set((state) => {
      state.minterStates[state.minterStates.length - 1].state = status;
      console.log(state);
    });
  },

  resetMinterState: () => {
    set({
      minterStates: [],
    });
  },
}));
