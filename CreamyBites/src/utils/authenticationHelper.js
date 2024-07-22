export const doLogin=(data, next)=>{
    localStorage.setItem("data" , JSON.stringify(data));
    next()
}

export const doLogout=(next)=>{
    localStorage.removeItem("data")
    next()
}

export const isLoggedIn=()=>{
    if(localStorage.getItem("data")==null) return false;
    else return true;
}

export const getUser=()=>{
    if(isLoggedIn){
        return JSON.parse(localStorage.getItem("data").user)
    }
    else{
        return false;
    }
}