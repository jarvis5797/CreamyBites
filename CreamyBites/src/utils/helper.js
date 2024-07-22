import axios from "axios"

export const BASE_URL = 'http://localhost:8080/api/v1';

export const connectBackend = axios.create({
    baseURL:BASE_URL,
})