import axios from 'axios';
import storage from '../storage/storage'

const axiosClient = axios.create({
    baseURL: `http://localhost:8080/api/v1`
    //timeout: 5000, // default is `0` (no timeout)
    //responseType: 'json'
});

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    // if token exist then attach them
    const token = storage.getToken()
    if (token !== null && token !== undefined) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data !== undefined) {
        // only get data
        return response.data;
    }

    return response;
}, (error) => {
    // Handle errors
    if (error.response) {
        throw error.response
    } else if (error.request) {
        throw error.request
    } else throw error;
});

export default axiosClient;