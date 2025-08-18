import {create} from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    loading: false,

    signup: async (userData) => {
        set({ loading: true });
        try {
            const response = await axios.post('/api/auth/signup', userData);
            set({ user: response.data.result, isAuthenticated: true, loading: false });
            toast.success('Signup successful!');
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message);
        }
    },

    login: async (userData) => {
        set({ loading: true });
        try {
            const response = await axios.post('/api/auth/login', userData);
            set({ user: response.data.result, isAuthenticated: true, loading: false });
            toast.success('Login successful!');
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message);
        }
    },

    logout: async () => {
        try {
            await axios.post('/api/auth/logout');
            set({ user: null, isAuthenticated: false });
            toast.success('Logged out successfully!');
        } catch (error) {
            toast.error('Logout failed. Please try again.');
        }
    },
}));

export default useAuthStore;
