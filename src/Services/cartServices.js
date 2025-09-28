import axiosInstance from "../apis/axiosInstance";
import { API_END_POINTS } from "../Constants/endPoints";

export const getCartByUserId = async (data) => {
    return await axiosInstance.get(`${API_END_POINTS.GET_SINGLE_CART}/${data}`);
}

export const addtoCartByUserId = async (data) => {
    return await axiosInstance.post(API_END_POINTS.ADD_TO_CART, data);
}

export const updateCartByUserId = async (data) => {
    return await axiosInstance.put(`${API_END_POINTS.UPDATE_CART}/${data}`);
}

export const deleteProductInCart = async (data) => {
    return await axiosInstance.delete(`${API_END_POINTS.DELETE_CART}/${data}`);
}