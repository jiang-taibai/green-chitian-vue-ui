import {createAxiosInstance} from "@/assets/js/api/axios-wrapper.js";
import {API_URL} from "@/assets/js/api/config.js";

const api = createAxiosInstance({
    baseURL: API_URL,
    timeout: 5000,
    useToken: true,
});

/**
 * 使用账号、密码登陆
 * @param username  用户名
 * @param password  密码
 * @returns {Promise<AxiosResponse<Result>>} 登陆结果
 */
export const login = ({username, password}) => {
    return api.post({
        url: '/user/login',
        data: {
            username,
            password
        }
    });
}