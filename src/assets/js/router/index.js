import {createRouter, createWebHashHistory} from 'vue-router'


const Auth = () => import('@/views/auth/Auth.vue')
const Dashboard = () => import('@/views/user/Dashboard.vue')
const Encyclopedia = () => import('@/views/user/Encyclopedia.vue')
const Record = () => import('@/views/user/Record.vue')
const Data = () => import('@/views/user/FarmlandData.vue')
const Profile = () => import('@/views/user/Profile.vue')

const EncyclopediaIndex = () => import('@/views/user/encyclopedia/Index.vue')

const RecordIndex = () => import('@/views/user/record/Index.vue')
const RecordDetail = () => import('@/views/user/record/Detail.vue')
const RecordUpload = () => import('@/views/user/record/Upload.vue')

const ProfileIndex = () => import('@/views/user/profile/Index.vue')
const ProfileModifyPassword = () => import('@/views/user/profile/ModifyPassword.vue')
const ProfileModifyPhone = () => import('@/views/user/profile/ModifyPhone.vue')

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
    component: Encyclopedia,
    redirect: '/user/encyclopedia/index',
    children: [{
        path: 'index',
        name: 'EncyclopediaIndex',
        component: EncyclopediaIndex
    }]
}, {
    path: '/user/record',
    name: 'UserRecord',
    component: Record,
    redirect: '/user/record/index',
    children: [{
        path: 'index',
        name: 'RecordIndex',
        component: RecordIndex
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
    component: Profile,
    children: [{
        path: 'index',
        name: 'ProfileIndex',
        component: ProfileIndex
    }, {
        path: 'modify-phone',
        name: 'ProfileModifyPhone',
        component: ProfileModifyPhone
    }, {
        path: 'modify-password',
        name: 'ProfileModifyPassword',
        component: ProfileModifyPassword
    }]
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