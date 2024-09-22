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