import { create } from "zustand";

interface ToAndFroState {
    isSignIn :boolean;
    toggleSign: () => void;
}


export const toAndFroStore = create<ToAndFroState>((set) => ({
    isSignIn: false,
    toggleSign: () =>  set((state)=> ({isSignIn: !state.isSignIn})),
}))