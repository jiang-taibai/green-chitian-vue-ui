import {createAxiosInstance} from "@/assets/js/api/axios-wrapper.js";
import {WEI_XIN_DEVELOPER_ID} from "@/assets/js/secret/index.js";
import Joi from 'joi';

const api = createAxiosInstance({
    baseURL: 'https://open.weixin.qq.com',
    useToken: false,
});

const schema = Joi.object({
    redirectUri: Joi.string()
        .uri()
        .required()
        .messages({
            'string.empty': 'redirectUri 不能为空',
            'string.uri': 'redirectUri 必须是一个有效的url',
            'any.required': 'redirectUri 不能为空'
        }),
    scope: Joi.string()
        .required()
        // snsapi_base: 不弹出授权页面，直接跳转，只能获取用户 openid
        // snsapi_userinfo: 弹出授权页面，可通过 openid 拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息
        .valid('snsapi_base', 'snsapi_userinfo')
        .messages({
            'string.empty': 'scope 不能为空',
            'any.required': 'scope 不能为空',
            'any.invalid': 'scope 只能是 snsapi_base 或 snsapi_userinfo'
        }),
    state: Joi.string()
        .required()
        .max(128)
        .pattern(/^[a-zA-Z0-9]+$/)
        .messages({
            'string.empty': 'state 不能为空',
            'any.required': 'state 不能为空',
            'string.max': 'state 最多128个字符',
            'string.pattern.base': 'state 只能包含字母和数字'
        }),
});

/**
 * 获取微信授权链接
 * @param redirectUri   授权后重定向的回调链接地址，请使用 urlEncode 对链接进行处理
 * @param scope         应用授权作用域
 * @param state         重定向后会带上state参数，开发者可以填写 a-zA-Z0-9 的参数值，最多 128 字节
 * @returns {Promise<string>}
 */
export const getAuthorizeURL = ({redirectUri, scope, state}) => {
    const params = {
        appid: WEI_XIN_DEVELOPER_ID,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: scope,
        state: state
    }
    // 验证参数
    const result = schema.validate({
        redirectUri,
        scope,
        state
    });
    if (result.error) {
        return Promise.reject(result.error);
    }
    const urlSearchParams = new URLSearchParams(params);
    const url = `${api.defaults.baseURL}/connect/oauth2/authorize?${urlSearchParams.toString()}#wechat_redirect`;
    return Promise.resolve(url);
}