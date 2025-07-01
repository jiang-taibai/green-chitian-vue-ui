class WxMiniProgramUtils {
    // 判断是否为微信环境
    static isWeChatEnv() {
        // 检查是否存在微信的JS-SDK对象
        return /micromessenger/i.test(window.navigator.userAgent);
    }

    // navigateTo 封装
    static navigateTo(options) {
        if (this.isWeChatEnv()) {
            wx.miniProgram.navigateTo(options);
        } else {
            console.warn('当前不是微信环境，无法执行 navigateTo');
        }
    }

    // navigateBack 封装
    static navigateBack(options) {
        if (this.isWeChatEnv()) {
            wx.miniProgram.navigateBack(options);
        } else {
            console.warn('当前不是微信环境，无法执行 navigateBack');
        }
    }

    // switchTab 封装
    static switchTab(options) {
        if (this.isWeChatEnv()) {
            wx.miniProgram.switchTab(options);
        } else {
            console.warn('当前不是微信环境，无法执行 switchTab');
        }
    }

    // reLaunch 封装
    static reLaunch(options) {
        if (this.isWeChatEnv()) {
            wx.miniProgram.reLaunch(options);
        } else {
            console.warn('当前不是微信环境，无法执行 reLaunch');
        }
    }

    // redirectTo 封装
    static redirectTo(options) {
        if (this.isWeChatEnv()) {
            wx.miniProgram.redirectTo(options);
        } else {
            console.warn('当前不是微信环境，无法执行 redirectTo');
        }
    }

    // postMessage 封装
    static postMessage(options) {
        if (this.isWeChatEnv()) {
            wx.miniProgram.postMessage(options);
        } else {
            console.warn('当前不是微信环境，无法执行 postMessage');
        }
    }

    // getEnv 封装
    static getEnv(callback) {
        if (this.isWeChatEnv()) {
            wx.miniProgram.getEnv(callback);
        } else {
            console.warn('当前不是微信环境，无法执行 getEnv');
        }
    }
}

export {
    WxMiniProgramUtils
}
