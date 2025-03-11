import axios from "axios";
import { countServices } from "./countServices";

const Axios = axios.create({
    baseURL: "http://localhost:8082"
});

Axios.interceptors.request.use(request => {
    if (countServices.isLoged()) {
        const token = countServices.getToken();
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});

export default Axios;
