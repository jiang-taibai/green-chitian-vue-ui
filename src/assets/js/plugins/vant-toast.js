import {showLoadingToast, showToast, closeToast} from "vant";
// 当配置了按需引入时，如果显式地引入了 Vant 的样式文件，就必须要手动引入样式文件
// 参考：https://vant-ui.github.io/vant/#/zh-CN/toast#an-xu-yin-ru-zu-jian-shi-shi-yong-showtoast-shi-chu-xian-yang-shi-yi-chang-wen-ti
import 'vant/lib/toast/style';
// 此时还需要手动引入基本的样式文件
import 'vant/lib/index.css';

import {merge} from 'lodash';

/**
 * 默认的 失败的 Toast 配置
 */
const DEFAULT_FAIL_TOAST_OPTIONS = {
    type: 'fail',
    message: '操作失败',
    duration: 5000,
}

/**
 * 默认的 成功的 Toast 配置
 */
const DEFAULT_SUCCESS_TOAST_OPTIONS = {
    type: 'success',
    message: '操作成功',
    duration: 2000,
}

/**
 * 显示失败的 Toast
 * @param options {Object|String} 配置项或者消息
 */
const showFailToast = (options) => {
    if (options instanceof Object) {
        options = merge({}, DEFAULT_FAIL_TOAST_OPTIONS, options);
    } else {
        options = merge({}, DEFAULT_FAIL_TOAST_OPTIONS, {message: options});
    }
    showToast(options);
}

/**
 * 显示成功的 Toast
 * @param options {Object|String} 配置项或者消息
 */
const showSuccessToast = (options) => {
    if (options instanceof Object) {
        options = merge({}, DEFAULT_SUCCESS_TOAST_OPTIONS, options);
    } else {
        options = merge({}, DEFAULT_SUCCESS_TOAST_OPTIONS, {message: options});
    }
    showToast(options);
}

export {
    showToast,
    showSuccessToast,
    showFailToast,
    showLoadingToast,
    closeToast,
}
