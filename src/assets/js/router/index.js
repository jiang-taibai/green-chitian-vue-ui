import {createRouter, createWebHashHistory} from 'vue-router'


const Auth = () => import('@/views/auth/Auth.vue')
const Dashboard = () => import('@/views/user/Dashboard.vue')
const Encyclopedia = () => import('@/views/user/Encyclopedia.vue')
const Record = () => import('@/views/user/Record.vue')
const Data = () => import('@/views/user/FarmlandData.vue')
const Profile = () => import('@/views/user/Profile.vue')

const RecordHome = () => import('@/views/user/record/Home.vue')
const RecordDetail = () => import('@/views/user/record/Detail.vue')
const RecordUpload = () => import('@/views/user/record/Upload.vue')

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
    name: 'UserDashboard',
    component: Dashboard
}, {
    path: '/user/encyclopedia',
    name: 'UserEncyclopedia',
    component: Encyclopedia
},{
    path: '/user/record',
    name: 'UserRecord',
    component: Record,
    redirect: '/user/record/home',
    children: [{
        path: 'home',
        name: 'RecordHome',
        component: RecordHome
    }, {
        path: 'detail/:id',
        name: 'RecordDetail',
        component: RecordDetail
    }, {
        path: 'upload',
        name: 'RecordUpload',
        component: RecordUpload
    }]
}, {
    path: '/user/farmland-data',
    name: 'UserFarmlandData',
    component: Data
}, {
    path: '/user/profile',
    name: 'UserProfile',
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