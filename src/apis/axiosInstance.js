import axios from "axios";
import { API_CONFIG, API_CONFIGSPRO } from "../Constants/apis";

const axiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.setTimeout
});

export const axiosInstancePRO = axios.create({
    baseURL: API_CONFIGSPRO.BASE_URL,
    timeout: API_CONFIGSPRO.setTimeout
});

axiosInstance.interceptors.request.use(
    (req) => {
        const token = localStorage.getItem(API_CONFIG.TOKEN);
        if(token){
            req.headers[API_CONFIG.AUTHORIZATION] = `${API_CONFIG.BEARER} ${token}`;
        }
        return req;
    }
)

axiosInstance.interceptors.response.use(
    response => {
        if(response.headers[API_CONFIG.AUTHORIZATION] !== undefined){
            localStorage.setItem("token", response.headers[API_CONFIG.AUTHORIZATION])
        }
        return response;
    },
    error => {
        return Promise.reject(error);
    }
)

axiosInstancePRO.interceptors.request.use(
    (req) => {
        const token = localStorage.getItem(API_CONFIGSPRO.TOKEN);
        if(token){
            req.headers[API_CONFIGSPRO.AUTHORIZATION] = `${API_CONFIGSPRO.BEARER} ${token}`;
        }
        return req;
    }
)

axiosInstancePRO.interceptors.response.use(
    response => {
        if(response.headers[API_CONFIGSPRO.AUTHORIZATION] !== undefined){
            localStorage.setItem("token", response.headers[API_CONFIGSPRO.AUTHORIZATION])
        }
        return response;
    },
    error => {
        return Promise.reject(error);
    }
)

export default axiosInstance;