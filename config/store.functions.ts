import * as SecureStore from 'expo-secure-store';

import { useAuthStore  } from '@/store/store';
import { toAndFroStore } from '@/store/toandfro';
import { coursesStore } from '@/store/dataStore';

export const useTokenSync = () => useAuthStore.getState().token;

export const getTokenAsync = () => useAuthStore.getState().getToken();

export const setToken = (token: string) => useAuthStore.getState().setToken(token);

export const clearToken = () => useAuthStore.getState().clearToken();

export const toggleSign = () => toAndFroStore.getState().toggleSign();

export const getBookMarks = () => {
    return coursesStore.getState().getBookMarks();
}

export const getTutors = () => {    
    return coursesStore.getState().getTutors();
}

export const setBookMarks = (data:[]) => {
    return coursesStore.getState().setBookMarks(data);
}

export const setTutors = (data: []) => {
    return coursesStore.getState().setTutors(data);
}