import axios from "axios";

const httpRequest = axios.create({
    baseURL: "https://apizingmp3.herokuapp.com/api/",
});

httpRequest.interceptors.response.use(
    (res) => res.data,
    (err) => Promise.reject(err),
);

export default httpRequest;
