import axios from "axios";

const BASE_URL = "http://localhost:3001/";
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": 'application/json',
        "Accept": '*/*'
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