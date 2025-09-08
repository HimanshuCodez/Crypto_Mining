import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.cryptominning.in/api', // Or your backend URL
  withCredentials: true, // This is the key part
});

export default instance;