import React, { createContext, useState } from 'react';
import CustomAxios from '../utils/customAxios';
import axios from 'axios';
import { API, BASE_URL } from '../utils/api';

export const RequestContext = createContext();

const RequestContextProvider = ({ children }) => {
    const getRequests = async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await CustomAxios.get(API.REQUEST.REQUESTS_ROUTE);
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    };

    const createRequest = async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await CustomAxios.post(API.REQUEST.REQUESTS_ROUTE, data);
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    };

    const getRequestById = async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await CustomAxios.get(`${API.REQUEST.REQUESTS_ROUTE}/${id}`);
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    const checkRequestDetailsOtp = async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await CustomAxios.post(`${API.REQUEST.REQUESTS_ROUTE}/check-otp`, data);
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    }

    const getDonateRequest = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await CustomAxios.get(API.REQUEST.DONATE_REQUESTS_ROUTE);
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    };

    const sendOtpRequestForRequestConfirm = async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await CustomAxios.post(`${API.REQUEST.REQUESTS_ROUTE}/send-otp`, {
                    requestId: data
                });
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    }




    return (
        <RequestContext.Provider value={{
            getRequests,
            createRequest,
            getRequestById,
            checkRequestDetailsOtp,
            getDonateRequest,
            sendOtpRequestForRequestConfirm

        }}>
            {children}
        </RequestContext.Provider>
    );
};

export default RequestContextProvider;