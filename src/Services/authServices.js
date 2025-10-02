import axiosInstance from "../apis/axiosInstance";
import { API_END_POINTS } from "../Constants/endPoints";

/**
 * !!! USER AUTHENTICATION AXIOS INSTANCE TO HANDLE API REQUESTS & RESPONSE
 */

export const signupAPI = async (data) => {
    return await axiosInstance.post(API_END_POINTS.SIGNUP, data);
}

export const signinAPI = async (data) => {
    return await axiosInstance.post(API_END_POINTS.SIGNIN, data);
}

export const resetpasswordAPI = async (data) => {
    return await axiosInstance.post(API_END_POINTS.FORGOT_PASSWORD, data);
}