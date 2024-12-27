import {defineStore} from 'pinia';
import { ref, computed } from 'vue'
import router from '@/assets/js/router';

export const useUserStore = defineStore('user', () => {
    // 📌 State
    const token = ref(localStorage.getItem('token') || '')
    const needBindPhone = ref(false)

    // 📌 Getters
    const isAuthenticated = computed(() => !!token.value)

    // 📌 Actions
    const setToken = (newToken) => {
        token.value = newToken
        localStorage.setItem('token', newToken)
    }
    const setNeedBindPhone = (need) => {
        needBindPhone.value = need
    }

    const clearUser = async () => {
        token.value = ''
        setNeedBindPhone.value = false
        localStorage.removeItem('token')
        try {
            await router.push({name: 'Auth'})
        } catch (err) {
            console.error('路由跳转失败', err)
        }
    }

    return {
        token,
        isAuthenticated,
        setToken,
        setNeedBindPhone,
        clearUser,
    }
})
