import {create} from 'zustand';
import api from '../api/axios';
import { toast } from 'react-toastify';

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    users: [],

    fetchAllUsers: async () => {
        set({ loading: true });
        try {
            const response = await api.get('/admin/users');
            set({ users: response.data, loading: false });
        } catch (error) {
            set({ loading: false });
            toast.error('Failed to fetch users.');
        }
    },

    signup: async (userData) => {
        set({ loading: true });
        try {
            await api.post('/auth/signup', userData);
            const { checkAuth } = useAuthStore.getState();
            await checkAuth();
            toast.success('Signup successful!');
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message);
        }
    },

    login: async (userData) => {
        set({ loading: true });
        try {
            const response = await api.post('/auth/login', userData);
            set({ user: response.data.result, isAuthenticated: true, loading: false });
            toast.success('Login successful!');
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message);
        }
    },

    logout: async () => {
        try {
            await api.post('/auth/logout');
            set({ user: null, isAuthenticated: false });
            toast.success('Logged out successfully!');
        } catch (error) {
            toast.error('Logout failed. Please try again.');
        }
    },

    setUser: (userData) => {
        set({ user: userData });
    },

    checkAuth: async () => {
        set({ loading: true });
        try {
            const response = await api.get('/user/profile');
            set({ user: response.data, isAuthenticated: true, loading: false });
        } catch (error) {
            set({ user: null, isAuthenticated: false, loading: false });
        }
    },
}));

export default useAuthStore;
