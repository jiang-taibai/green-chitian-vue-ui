import {createAxiosInstance} from "@/assets/js/api/axios-wrapper.js";
import {API_URL} from "@/assets/js/api/config.js";

const api = createAxiosInstance({
    baseURL: API_URL,
    timeout: 5000,
    useToken: true,
});

/**
 * 查询所有的居委会，data 为 String[]
 */
export const getAllCommittee = () => {
    return api.get('/field/block/fertilizer/committee/all');
}

/**
 * 查询所有的地块类型
 */
export const getAllFieldClass = () => {
    return api.get('/field/block/fertilizer/get/fieldclass/all');
}