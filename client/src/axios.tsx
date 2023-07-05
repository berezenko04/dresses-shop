import axios from "axios";

const instance = axios.create({
    // baseURL: 'https://dresses-shop-server.onrender.com',
    baseURL: 'http://localhost:3001'
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem('token');
    return config;
});

export default instance;