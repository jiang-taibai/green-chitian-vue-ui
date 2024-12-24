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

/**
 * 上传照片
 * @param image {File}          照片
 * @param isCompress {Boolean}  是否压缩
 */
export const uploadImage = (image, isCompress = true) => {
    const formData = new FormData();
    formData.append("image", image)
    formData.append("isCompress", isCompress)
    return api.post('/images/fileupload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}