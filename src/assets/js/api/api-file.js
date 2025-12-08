import {createAxiosInstance} from "@/assets/js/api/axios-wrapper.js";
import {API_URL} from "@/assets/js/api/config.js";
import {createLRU} from "@/assets/js/cache/lru.js";

const api = createAxiosInstance({
    baseURL: API_URL, useToken: true,
});

const imageCache = createLRU('api.image', 100);

/**
 * 根据照片Id获取照片
 * @param id    照片 Id
 * @param isCompress {Boolean}  是否压缩
 * @returns {Promise<string>}   解析后的照片 URL
 */
export const getImage = async (id, isCompress = true) => {
    // 先从缓存获取
    const key = `image_${id}${isCompress ? '_compress' : ''}`;
    const cached = imageCache.get(key);
    if (cached) {
        return Promise.resolve(URL.createObjectURL(cached));
    }
    try {
        const res = await api.get(`/images/get/${id}`, {
            responseType: 'blob'
        })
        const result = URL.createObjectURL(res);
        // 存入缓存
        imageCache.set(key, res);
        return Promise.resolve(result);
    } catch (e) {
        return Promise.reject(e);
    }
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