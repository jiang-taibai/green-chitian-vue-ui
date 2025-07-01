/**
 * 该文件用于将一些字段转换为统一的格式
 * 要么将后端返回的数据转换为前端需要的格式，要么将前端输入的数据转换为后端需要的格式
 * 例如：将居委会、田地类型、田地ID 转换为统一的 {居委会}-{田地类型} #{田地ID} 的格式
 */

/**
 * 转换田地字段名称
 * @param committee     居委会
 * @param fieldClass    田地类型
 * @param fieldId       田地 ID
 * @returns {`${string}-${string} #${string}`}  居委会-田地类型 #田地 ID
 */
export const convertFieldName = (committee, fieldClass, fieldId) => {
    return `${committee}-${fieldClass} #${fieldId}`;
}

/**
 * 统一转换小数为两位小数
 * 1. 如果 value 为 null 或者 undefined，则返回 0.00
 * 2. 如果 value 为字符串，则尝试转换为小数，如果转换失败，则返回原字符串
 * 3. 如果 value 为数字，则返回转换为两位小数的字符串
 * 4. 其它情况，直接返回 value
 * @param value         需要转换的小数
 * @returns {string}    转换后的小数
 */
export const tryConvertDecimalToFixed2 = (value) => {
    if (value === null || value === void 0) {
        value = 0;
    }
    if (typeof value === 'string') {
        const number = parseFloat(value);
        if (isNaN(number)) {
            return value;
        }
        value = number;
    }
    if (typeof value === 'number') {
        return value.toFixed(2);
    }
    return value
}

/**
 * 将日期转换为 YYYY-MM-DD 格式
 * @param date  {Date}  日期
 */
export const convertDateToYYYYMMDD = (date) => {
    if (date instanceof Date) {
        return date.toISOString().split('T')[0];
    }
    return date;
}

/**
 * 将坐标对象转换为数组，以便后端存储
 * @param location {{text: string, longitude: number, latitude: number}}
 * @returns {string}
 */
export const convertLocationToArray = (location) => {
    return JSON.stringify([location.text, location.longitude, location.latitude]);
}

/**
 * 将数组转换为地理位置对象
 * @param locationArrayString
 * @returns {{text: string, longitude: number, latitude: number}}
 */
export const convertArrayToLocation = (locationArrayString) => {
    const locationArray = JSON.parse(locationArrayString);
    return {
        text: locationArray[0],
        longitude: locationArray[1],
        latitude: locationArray[2]
    }
}