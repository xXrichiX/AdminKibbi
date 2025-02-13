import axios from 'axios';

//configuracion global de la api
const api = axios.create({
    baseURL: 'https://orderandout.onrender.com/api/intern',
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    },
})

//interceptor para incluir el token en cada peticion 
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`; 
        }
        return config;
    },
    (error) => Promise.reject(error)
)

export default api;