import axios from "axios";

const base = "http://localhost:9000"

export const getData = () => {
    return axios.get(`${base}/api/users`); 
}