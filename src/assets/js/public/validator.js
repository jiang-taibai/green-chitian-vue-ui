/**
 * 判断字符串是否为空
 * 如果是 undefined 或者 null 也会返回 true
 * 如果不是字符串，会打印警告信息，并返回 true
 * @param value         需要判断的值
 * @param trim          是否去掉前后空格
 * @returns {boolean}   返回是否为空
 */
export const isEmptyString = (value, trim = false) => {
    if (value === void 0 || value === null) {
        return true;
    }
    if (typeof value === 'string') {
        if (trim) {
            return value.trim() === '';
        } else {
            return value === '';
        }
    }
    return true;
}

/**
 * 是否为空数组，如果是 undefined 或者 null 也会返回 true
 * 如果不是数组，会打印警告信息，并返回 true
 * @param value         需要判断的值
 * @returns {boolean}   返回是否为空数组
 */
export const isEmptyArray = (value) => {
    if (value === void 0 || value === null) {
        return true;
    }
    if (value instanceof Array) {
        return value.length === 0;
    }
    console.warn('需要判断的值不是数组：', value);
    return true;
}

/**
 * 判断是否为 undefined 或者 null
 * @param value        需要判断的值
 * @returns {boolean}  返回是否为空
 */
export const isUndefinedOrNull = (value) => {
    return value === void 0 || value === null;
}

export default {
    isEmptyString,
    isEmptyArray,
    isUndefinedOrNull,
}