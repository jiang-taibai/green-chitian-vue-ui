/**
 * 判断请求是否成功
 * @param res {Result}  请求结果
 * @returns {boolean}   是否成功
 */
export const isSuccessResponse = (res) => {
    return Boolean(res?.code && res.code === 1);
};