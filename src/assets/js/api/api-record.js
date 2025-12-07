import {createAxiosInstance} from "@/assets/js/api/axios-wrapper.js";
import {API_URL} from "@/assets/js/api/config.js";

const api = createAxiosInstance({
    baseURL: API_URL,
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
 * @param fieldId       地块 ID
 * @param size          分页大小
 * @param current       当前页
 * @param startDate     开始日期
 * @param endDate       结束日期
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

/**
 * 查询化肥类型和每个类型下的具体肥料
 */
export const getAllFertilizations = () => {
    return api.get('/fertilizer/types/all', {})
}

/**
 * 上传施肥记录
 * @param fertilizationRecordDto {FertilizationRecordDto} 施肥记录 DTO
 */
export const uploadFertilization = (fertilizationRecordDto) => {
    return api.post('/fertilizer/add/fertilizations', fertilizationRecordDto);
}

/**
 * 通过 ID 查询施肥记录
 * @param id    施肥记录 ID
 */
export const getFertilizationRecordById = (id) => {
    return api.get(`/fertilizer/get/fertilization/${id}`)
}