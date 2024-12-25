import {createAxiosInstance} from "@/assets/js/api/axios-wrapper.js";
import {API_URL} from "@/assets/js/api/config.js";

const api = createAxiosInstance({
    baseURL: API_URL,
    timeout: 5000,
    useToken: true,
});

/**
 * 获取化肥农药比例饼图数据
 */
export const getFertilizerPesticideProportionPieChartData = () => {
    return getData('fertilizer-pesticide-proportion-pie-chart');
}

/**
 * 获取各化肥农药统计-用量数据
 */
export const getFertilizerPesticideStatisticsUsageData = () => {
    return getData('fertilizer-pesticide-statistics-usage');
}

/**
 * 获取各化肥农药统计-频次数据
 */
export const getFertilizerPesticideStatisticsFrequencyData = () => {
    return getData('fertilizer-pesticide-statistics-frequency');
}

/**
 * 统一的请求方法
 * @param type  数据类型
 */
const getData = (type) => {
    return api.get(`/user/count/screen/${type}/condition`);
}