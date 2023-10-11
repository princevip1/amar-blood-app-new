import React, { createContext, useState } from 'react';
import CustomAxios from '../utils/customAxios';
import axios from 'axios';
import { API, BASE_URL } from '../utils/api';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    const getOtp = async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post(`${BASE_URL}/auth/login`, data);
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    };

    const submitOtp = async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await CustomAxios.post(API.AUTH.SUBMIT_OTP, data);
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    };

    const getDistricts = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await CustomAxios.get(API.LOCATION.GET_DISTRICTS);
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    };

    const getAreasByDistrictId = async (districtId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await CustomAxios.get(`${API.LOCATION.GET_AREAS}/${districtId}`);
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    const register = async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await CustomAxios.post(API.AUTH.REGISTER, data);
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    };

    const checkUser = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await CustomAxios.get(API.AUTH.CHECK_USER);
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    };

    const updatePushToken = async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await CustomAxios.put(API.AUTH.UPDATE_PUSH_TOKEN, data);
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    }




    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            getOtp,
            submitOtp,
            // location
            getDistricts,
            getAreasByDistrictId,
            register,
            checkUser,
            updatePushToken
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;