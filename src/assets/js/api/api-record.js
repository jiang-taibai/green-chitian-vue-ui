import {createAxiosInstance} from "@/assets/js/api/axios-wrapper.js";
import {API_URL} from "@/assets/js/api/config.js";

const api = createAxiosInstance({
    baseURL: API_URL,
    timeout: 5000,
    useToken: true,
});

/**
 * 查询用户拥有的地块
 */
export const userFields = () => {
    return api.get('/user/get/user/fields', {});
}

/**
 * 分页查询该用户地块施肥记录
 */
export const getFertilizations = ({fieldId, size, current, startDate, endDate}) => {
    return api.get('/fertilizer/get/fertilizations', {
        params: {
            fieldId,
            size,
            current,
            startDate,
            endDate
        }
    });
}