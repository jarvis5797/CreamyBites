import { connectBackend, setToken } from "../utils/helper"

export const addItem=(item)=>{
    setToken();
    return connectBackend.post("/addItem",item).then((response)=>response.data);
}