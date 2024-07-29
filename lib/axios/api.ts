import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get('token');

const BASE_URL = "http://localhost:3001/";
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": 'application/json',
        "Accept": '*/*',
        "Authorization": `Bearer ${token}`
    }
});

api.interceptors.request.use(config => {
    return config;
}, (err) => {
    return Promise.reject(err);
});

api.interceptors.response.use(response => {
    return response;
}, (err) => {
    return Promise.reject(err);
});

export const privateApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": 'application/json',
        "Accept": '*/*'
    },
    withCredentials: true
})


export default api;