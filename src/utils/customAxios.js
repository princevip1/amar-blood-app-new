import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { BASE_URL } from './api';


const CustomAxios = axios.create({
    baseURL: BASE_URL,
});

export const updateAccessToken = () => {
    CustomAxios.interceptors.request.use(async req => {
        const access_token = await SecureStore.getItemAsync('access_token')
        req.headers.Authorization = `Bearer ${access_token}`;
        return req;
    });
}
updateAccessToken()

export async function getAccessToken(key) {
    return await SecureStore.getItemAsync(key);
}
export async function saveToken(key, value) {
    await SecureStore.setItemAsync(key, value);
}
export async function getToken(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        return result
    } else {
        return false
    }
}

export async function removeToken(key) {
    await SecureStore.deleteItemAsync(key);
}


export default CustomAxios;