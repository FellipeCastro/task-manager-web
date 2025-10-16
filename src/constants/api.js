import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             console.warn(
//                 "Token inválido ou expirado. Redirecionando para login..."
//             );
//             localStorage.removeItem("authToken");
//             window.location.href = "/login";
//         }
//         return Promise.reject(error);
//     }
// );

export default api;
