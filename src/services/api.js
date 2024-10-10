import axios from 'axios';

const apiInstances = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 10000,
    headers: { headers: { 'Content-Type': 'application/json' } },
});

apiInstances.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.log(error)
        return Promise.reject(error);
    },
);
export default apiInstances;
