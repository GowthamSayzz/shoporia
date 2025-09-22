import axiosInstance, { axiosInstancePRO } from "../apis/axiosInstance";
import { API_END_POINTS, API_END_POINTSPRO } from "../Constants/endPoints";

export const signupAPI = async (data) => {
    return await axiosInstance.post(API_END_POINTS.SIGNUP, data);
}

export const signinAPI = async (data) => {
    return await axiosInstance.post(API_END_POINTS.SIGNIN, data);
}

export const resetpasswordAPI = async (data) => {
    return await axiosInstance.post(API_END_POINTS.FORGOT_PASSWORD, data);
}

export const signinAPIPRO = async (data) => {
    return await axiosInstancePRO.post(API_END_POINTSPRO.SIGNIN, data);
}