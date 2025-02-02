import axios from "axios";
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: 'http://localhost:8000/api'
});

api.interceptors.request.use(
    config => {
        if (config.url === '/auth/login') {
            return config;
        }

        if (config.url === '/auth/register') {
            return config;
        }

        
        const authData = JSON.parse(localStorage.getItem('authorization'));

        if (authData && authData.token) {
            config.headers.Authorization = `Bearer ${authData.token}`;
            return config;
        }

        localStorage.removeItem('user');
        localStorage.removeItem('menu');
        window.location.href = '/login';

        return Promise.reject(new Error("Token não encontrado, usuário deslogado."));
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;
