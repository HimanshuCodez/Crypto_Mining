import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000', // Or your backend URL
  withCredentials: true, // This is the key part
});

export default instance;