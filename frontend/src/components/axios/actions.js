import axios from "axios";
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3 });

const base = "http://localhost:9000"

export const getData = () => {
    return axios.get(`${base}/api/users`); 
}
export const getDataById = (id) => {
    return axios.get(`${base}/api/users/${id}`)
}
export const editData = (id,modifiedContent) => {
    return axios.put(`${base}/api/users/${id}`,modifiedContent)
}