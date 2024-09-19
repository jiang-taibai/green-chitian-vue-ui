import {createRouter, createWebHashHistory} from 'vue-router'


const Dashboard = () => import('@/views/user/Dashboard.vue')
const Auth = () => import('@/views/auth/Auth.vue')

const routes = [{
    path: '/',
    redirect: '/user/dashboard'
}, {
    path: '/user/dashboard',
    name: 'Dashboard',
    component: Dashboard
}, {
    path: '/auth/auth',
    name: 'Auth',
    component: Auth
},]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router