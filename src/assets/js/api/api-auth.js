import {createAxiosInstance} from "@/assets/js/api/axios-wrapper.js";
import {API_URL} from "@/assets/js/api/config.js";
import Joi from 'joi';

const api = createAxiosInstance({
    baseURL: API_URL,
    useToken: true,
});

/**
 * 使用账号、密码登陆
 * @param username  用户名
 * @param password  密码
 * @returns {Promise<AxiosResponse<any>> | Promise<never>}
 */
export const login = ({username, password}) => {
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .required()
            .messages({
                'string.empty': '用户名不能为空',
                'string.alphanum': '用户名只能包含字母和数字',
                'any.required': '用户名不能为空'
            }),
        password: Joi.string()
            .required()
            .messages({
                'string.empty': '密码不能为空',
                'any.required': '密码不能为空'
            }),
    });
    const result = schema.validate({
        username,
        password
    });
    if (result.error) {
        return Promise.reject(result.error);
    }
    return api.post('/user/login', {username, password});
}

/**
 * 使用微信 code 登陆
 * @param code {String}  微信 code
 */
export const wxLogin = (code) => {
    return api.post('/user/wxlogin', {}, {
        params: {
            code
        }
    });
}