import {createAxiosInstance} from "@/assets/js/api/axios-wrapper.js";
import {API_URL} from "@/assets/js/api/config.js";

const api = createAxiosInstance({
    baseURL: API_URL,
    timeout: 5000,
    useToken: true,
});

/**
 * 根据照片Id获取照片
 * @param id    照片 Id
 */
export const getImage = (id) => {
    return api.get(`/images/get/${id}`, {
        responseType: 'blob'
    });
}