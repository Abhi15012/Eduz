import * as SecureStore from 'expo-secure-store';

import { useAuthStore  } from '@/store/store';

export const useTokenSync = () => useAuthStore.getState().token;

export const getTokenAsync = () => useAuthStore.getState().getToken();

export const setToken = (token: string) => useAuthStore.getState().setToken(token);

export const clearToken = () => useAuthStore.getState().clearToken();