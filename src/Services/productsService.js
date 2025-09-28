import axiosInstance from "../apis/axiosInstance";
import { API_END_POINTS } from "../Constants/endPoints";

export const getAllProductsAPI = async (data) => {
    return await axiosInstance.get(API_END_POINTS.ALL_PRODUCTS, data);
}

export const getAllProductsCategoriesAPI = async (data) => {
    return await axiosInstance.get(API_END_POINTS.ALL_PRODUCTS_CATEGORIES, data);
}

export const getAllProductsByCategoryAPI = async (data) => {
    return await axiosInstance.get(`${API_END_POINTS.ALL_PRODUCTS_BY_CATEGORY}/${data}`);
}

export const getProductByIdAPI = async (data) => {
    return await axiosInstance.get(`${API_END_POINTS.PRODUCTS_BY_ID}/${data}`);
}

export const getOtherProductsAPI = async (data) => {
    return await axiosInstance.get(API_END_POINTS.OTHER_PRODUCTS, data);
}

export const updateProductsQtyAPI = async (cartId, data) => {
    return await axiosInstance.put(`${API_END_POINTS.UPDATE_CART}/${cartId}`, data);
}