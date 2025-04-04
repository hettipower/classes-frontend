import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

export default axiosInstance;