import axiosInstance from "../apis/axiosInstance";
import { API_END_POINTS } from "../Constants/endPoints";

export const addressaddAPI = async (data) => {
    return await axiosInstance.post(API_END_POINTS.ADDRESS_ADD, data);
}

export const addressviewAPI = async (data) => {
    return await axiosInstance.post(API_END_POINTS.ADDRESS_VIEW, data);
}

export const addressdeleteAPI = async (data) => {
    return await axiosInstance.post(API_END_POINTS.ADDRESS_DELETE, data);
}