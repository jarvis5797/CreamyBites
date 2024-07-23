import axios from "axios"

export const BASE_URL = 'https://creamybites-server-production.up.railway.app/api/v1';

export const connectBackend = axios.create({
    baseURL:BASE_URL,
})