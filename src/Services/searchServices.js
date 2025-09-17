import axiosInstance from "../apis/axiosInstance";
import { API_END_POINTS } from "../Constants/endPoints";

export const searchsuggestionsAPI = async (data) => {
    return await axiosInstance.post(API_END_POINTS.SEARCH_SUGGESTIONS, data);
}