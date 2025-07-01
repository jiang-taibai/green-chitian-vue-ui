import {SYSTEM_CONFIG} from "@/assets/js/public/system.js";
import router from "@/assets/js/router/index.js";

/**
 * 生成一个随机数，范围是 [min, max]
 * @param min   最小值
 * @param max   最大值
 * @returns {number}   返回一个随机数
 */
export const getRandomIntNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 生成一个随机数，范围是 [min, max]
 * @param min   最小值
 * @param max   最大值
 */
export const getRandomFloatNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}

/**
 * 根据 vue-router 的路由对象，生成一个绝对路径的 URL
 * @param to    路由对象
 * @param currentLocation   当前的路由对象
 * @returns {string}    返回一个绝对路径的 URL
 */
export const resolveAbsoluteURL = (to, currentLocation) => {
    return SYSTEM_CONFIG.WEBSITE_BASE_URL + router.resolve(to, currentLocation).href;
}