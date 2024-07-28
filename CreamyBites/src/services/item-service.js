import { connectBackend, setToken } from "../utils/helper"

export const getAllItems=()=>{
    setToken();
    return connectBackend.get("/getItems").then((response)=>response.data);
}