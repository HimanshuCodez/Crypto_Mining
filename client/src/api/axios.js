import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://crypto-mining-95zt.onrender.com', // Or your backend URL
  withCredentials: true, // This is the key part
});

export default instance;