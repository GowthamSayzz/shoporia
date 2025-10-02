import axiosInstance from "../apis/axiosInstance";
import { API_END_POINTS } from "../Constants/endPoints";

/**
 * !!! ADMIN AXIOS INSTANCE TO HANDLE API REQUESTS & RESPONSE
 */

export const getAllUsersAPI = async (data) => {
    return await axiosInstance.get(API_END_POINTS.GET_ALL_USERS, data);
}

export const deleteUsersAPI = async (data) => {
    return await axiosInstance.delete(`${API_END_POINTS.DELETE_USER}/${data}`);
}