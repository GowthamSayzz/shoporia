import axiosInstance from "../apis/axiosInstance";
import { API_END_POINTS } from "../Constants/endPoints";

/**
 * !!! ADDRESS AXIOS INSTANCE TO HANDLE API REQUESTS & RESPONSE
 */

export const addressaddAPI = async (data) => {
    return await axiosInstance.post(API_END_POINTS.ADDRESS_ADD, data);
}

export const addressviewAPI = async (data) => {
    return await axiosInstance.get(API_END_POINTS.ADDRESS_VIEW, data);
}

export const addressdeleteAPI = async (data) => {
    return await axiosInstance.post(API_END_POINTS.ADDRESS_DELETE, data);
}

export const getAddressByUserAPI = async (data) => {
    return await axiosInstance.get(`${API_END_POINTS.GET_ADDRESS_BY_USER}/${data}`);
}