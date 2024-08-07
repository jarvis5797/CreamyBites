import { connectBackend, setToken } from "../utils/helper"

export const getAllItems=()=>{
    setToken();
    return connectBackend.get("/getItems").then((response)=>response.data);
}

export const getItemById=(id)=>{
    setToken();
    return connectBackend.get(`/getItemById/${id}`).then((response)=>response.data);
}