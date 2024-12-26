import axios from "axios"

// export const BASE_URL = 'https://139.59.5.205:8080/api/v1';
export const BASE_URL = 'http://localhost:8080/api/v1'

export const connectBackend = axios.create({
    baseURL:BASE_URL,
})

export const setToken=()=>{
    const token = JSON.parse(localStorage.getItem("data")).token;
    connectBackend.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}