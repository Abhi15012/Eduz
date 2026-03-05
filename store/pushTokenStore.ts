import { create } from "zustand";

interface PushTokenState {
  expoPushToken: string | null;
  setExpoPushToken: (token: string) => void;
  getExpoPushToken: () => string | null;
}

export const usePushTokenStore = create<PushTokenState>((set, get) => ({
  expoPushToken: null,
  setExpoPushToken: (token: string) => {
    set({ expoPushToken: token });
  },
  getExpoPushToken: () => get().expoPushToken,
}));
