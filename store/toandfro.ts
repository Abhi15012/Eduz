import { create } from "zustand";

interface ToAndFroState {
  isBookMarked: boolean;
  toggleBookmark: () => void;
}

export const toAndFroStore = create<ToAndFroState>((set) => ({
  isBookMarked: false,
  toggleBookmark: () => set((state) => ({ isBookMarked: !state.isBookMarked })),
}));