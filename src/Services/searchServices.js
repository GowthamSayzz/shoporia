import axiosInstance from "../apis/axiosInstance";
import { API_END_POINTS } from "../Constants/endPoints";

/** 
 * !!! SEARCH AXIOS INSTANCE TO HANDLE API REQUESTS & RESPONSE
 */

export const searchsuggestionsAPI = async (keyword) => {
    return await axiosInstance.get(`${API_END_POINTS.SEARCH_SUGGESTIONS}?q=${keyword}`);
}