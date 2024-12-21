// userStore.js
import {defineStore} from 'pinia';
import {ref} from 'vue';
import router from '@/assets/js/router';

export const useUserStore = defineStore('user', () => {
    // State
    const token = ref(localStorage.getItem('token') || '');
    const userInfo = ref(null);

    // Getters
    const isAuthenticated = () => !!token.value;

    // Actions
    const setUser = ({token, userData}) => {
        userInfo.value = userData;
        token.value = token;
        localStorage.setItem('token', token);
    };

    const clearUser = async () => {
        userInfo.value = null;
        token.value = '';
        localStorage.removeItem('token');
        try {
            await router.push({name: 'Auth'});
        } catch (err) {
            console.error('路由跳转失败', err);
        }
    };

    return {
        token,
        userInfo,
        isAuthenticated,
        setUser,
        clearUser,
    };
});
