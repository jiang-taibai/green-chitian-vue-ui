import axios from 'axios';
import {useUserStore} from '@/assets/js/store/user-info';
import router from "@/assets/js/router/index.js";

/**
 * 创建 Axios 实例的工厂函数
 * @param baseURL       基础请求地址
 * @param timeout       请求超时时间，默认 5000 毫秒
 * @param useToken      是否使用 token，默认使用；如果使用，则会使用 Pinia 的 useUserStore 获取 token
 * @returns {AxiosInstance}
 */
function createAxiosInstance(
    {
        baseURL,
        timeout = 5000,
        useToken = true,
    }) {
    const instance = axios.create({
        baseURL: baseURL,           // 基础请求地址，支持自定义
        timeout: timeout,           // 请求超时时间
        withCredentials: false,     // 是否携带 cookie
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // 请求拦截器
    if (useToken) {
        const userStore = useUserStore();
        instance.interceptors.request.use(
            (config) => {
                // 在请求发送前进行处理，例如添加 token
                const token = userStore.token;
                if (token) {
                    config.headers.Authorization = `${token}`;
                }
                return config;
            },
            (error) => {
                // 请求错误处理
                return Promise.reject(error);
            }
        );
    }

    // 响应拦截器
    instance.interceptors.response.use(
        (response) => {
            // 处理响应数据
            return response.data;
        },
        (error) => {
            // 处理响应错误
            const {response} = error;
            if (response) {
                switch (response.status) {
                    case 401:
                        console.error('未授权，请登录');
                        break;
                    case 403:
                        router.push({name: 'Auth'}).then(r => console.log(r));
                        break;
                    case 404:
                        console.error('请求地址不存在');
                        break;
                    default:
                        console.error(response.data.message || '请求失败');
                }
            } else {
                console.error('网络错误或服务器未响应');
            }
            return Promise.reject(error);
        }
    );

    return instance;
}

export {
    createAxiosInstance
};
