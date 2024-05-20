import axios from "axios";

 const instance = axios.create({
    baseURL: "https://api-devtest-jah.vercel.app/api/v1",
    withCredentials: true,
    });

export default instance;