import {createRouter, createWebHashHistory} from 'vue-router'


const Auth = () => import('@/views/auth/Auth.vue')
const Dashboard = () => import('@/views/user/Dashboard.vue')
const Record = () => import('@/views/user/Record.vue')
const Data = () => import('@/views/user/Data.vue')
const Profile = () => import('@/views/user/Profile.vue')

const authRoutes = [{
    path: '/',
    redirect: '/auth/auth'
}, {
    path: '/auth/auth',
    name: 'Auth',
    component: Auth
}]

const userRoutes = [{
    path: '/user/dashboard',
    name: 'Dashboard',
    component: Dashboard
}, {
    path: '/user/record',
    name: 'Record',
    component: Record
}, {
    path: '/user/data',
    name: 'Data',
    component: Data
}, {
    path: '/user/profile',
    name: 'Profile',
    component: Profile
}]

const routes = [
    ...authRoutes,
    ...userRoutes
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router