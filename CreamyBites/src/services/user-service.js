import { connectBackend } from "../utils/helper"

export const signIn=(loginDetails)=>{
    return connectBackend.post("/signin" ,loginDetails).then((response)=>response.data)
}