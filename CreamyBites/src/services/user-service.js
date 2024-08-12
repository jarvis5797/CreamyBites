import { connectBackend } from "../utils/helper"

export const signIn=(loginDetails)=>{
    return connectBackend.post("/signin" ,loginDetails).then((response)=>response.data)
}

export const generateOtp=(email)=>{
    return connectBackend.get(`/sendOtp/${email}`).then((response)=>response.data)
}

export const getVerified=(otp,hash)=>{
    return connectBackend.get(`/verifyEmail/${otp}/${hash}`).then((response)=>response.data)
}

export const signUp=(user)=>{
    return connectBackend.post("/signUp" , user).then((response)=>response.data)
}