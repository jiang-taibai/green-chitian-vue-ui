const SYSTEM_CONFIG = {
    // 是否开启短信服务
    SMS_ENABLED: false,
    // 是否开启短信登录
    SMS_LOGIN_ENABLED: false,
    // 是否开启注册服务
    REGISTRATION_ENABLED: false,
    // 是否开启忘记密码服务
    FORGOT_PASSWORD_ENABLED: false,
    // 网站的基本URL，用于拼接回调 URL 等功能
    // WEBSITE_BASE_URL: import.meta.env.PROD ? 'https://project.coderjiang.com/green-chitian' : 'http://localhost:5173',
    WEBSITE_BASE_URL: 'https://project.coderjiang.com/green-chitian',
}

export {
    SYSTEM_CONFIG,
}