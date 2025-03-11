import Axios from "./axiosServices"
import { jwtDecode } from 'jwt-decode'

const login=(loginData)=>{
    return Axios.post('/login',loginData);
}

const saveToken = (token) => {
    localStorage.setItem('token', token);
}

const logOut=()=>{
    localStorage.removeItem('token')

}

const isLoged=()=>{
    let token=localStorage.getItem('token')
    return !!token;
}

const getToken=()=>{
    return localStorage.getItem('token');
}

const decoderToken=()=>{
    const token = getToken();
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
 return decodedToken
}
const getId=()=>{
    const decoderTokenVar =decoderToken();
    const id = decoderTokenVar.id;
    return id;
}
const getApogie=()=>{
    const decoderTokenVar =decoderToken();
    const apogee = decoderTokenVar.apogee;
    return apogee;
}
export const countServices = {
    login, saveToken , logOut , isLoged, getToken, decoderToken, getId,getApogie

}
