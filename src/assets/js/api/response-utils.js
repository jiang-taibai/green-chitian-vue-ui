/**
 * 判断是否满足基本要求，非空，非undefined
 * @param obj
 * @returns {boolean}
 */
const basicValid = (obj) => {
    return obj !== null && obj !== undefined;
}

/**
 * 判断请求是否成功
 * @param res {Result}  请求结果
 * @returns {boolean}   是否成功
 */
export const isSuccessResponse = (res) => {
    return Boolean(
        basicValid(res) &&
        res?.code &&
        res.code === 1
    );
};

/**
 * 判断是否是分页查询的结果，校验字段
 * @param res {Page}    请求分页的结果
 * @returns {boolean}   是否是分页查询的结果
 */
export const isSuccessPageResponse = (res) => {
    return (
        basicValid(res) &&
        typeof res === 'object' &&
        typeof res.current === 'number' &&
        typeof res.pages === 'number' &&
        Array.isArray(res.records) &&
        typeof res.size === 'number' &&
        typeof res.total === 'number'
    );
}

/**
 * 判断天地图请求是否成功
 * @param res {TianDiTuResponse}    天地图请求结果
 */
export const isSuccessTianDiTuResponse = (res) => {
    return (
        basicValid(res) &&
        typeof res === 'object' &&
        res?.status === "0"
    );
}