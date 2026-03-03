import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  getToken: () => Promise<void>; 
  useToken: () => Promise<string | null>;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    token: null,
    setToken: async (token: string) => {
        set({ token });
 
        await SecureStore.setItemAsync('authToken', token);
    },
    getToken: async () => {
        const token = await SecureStore.getItemAsync('authToken');
     
        set({ token });
    },
    useToken: async () => {
       const PresentToken= get().token;
        if (PresentToken !== null) return PresentToken;

    const fresh = await SecureStore.getItemAsync('authToken');
    set({ token: fresh });
    return fresh;
    },
    clearToken: async () => {
        set({ token: null });
        await SecureStore.deleteItemAsync('authToken');
    },
    


})
)






