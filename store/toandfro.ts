import { create } from "zustand";

interface ToAndFroState {
    isSignIn :boolean;
    toggleSign: () => void;
}


export const toAndFroStore = create<ToAndFroState>((set) => ({
    isSignIn: false,
    toggleSign: () =>  set((state)=> ({isSignIn: !state.isSignIn})),
}));
console.log("ToAndFro store initialized with isSignIn:", toAndFroStore.getState().isSignIn  ); // Debug log to confirm store initialization 