import axios from "axios";

const api = axios.create({
     baseURL: 'https://sistema-generico-api.vercel.app/api/api'
    // baseURL: 'http://localhost:8000/api'
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

api.interceptors.response.use(
    response => response, 
    error => {
        if (error.response && error.response.status === 401 && window.location.pathname != '/login')     {
            localStorage.removeItem('authorization');
            localStorage.removeItem('user');
            localStorage.removeItem('menu');
            window.location.href = '/login'; 
            return;
        }
        return Promise.reject(error);
    }
)

export default api;
