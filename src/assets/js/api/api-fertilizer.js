import {createAxiosInstance} from "@/assets/js/api/axios-wrapper.js";
import {API_URL} from "@/assets/js/api/config.js";

const api = createAxiosInstance({
    baseURL: API_URL,
    timeout: 5000,
    useToken: true,
});

/**
 * 通过多条件查询（田地类型、委员会）查询所有地块的土壤养分信息
 * @param fieldClass    田地类型
 * @param committee     委员会
 */
export const queryFieldBlockFertilizerByMultiCondition = ({fieldClass, committee}) => {
    return api.get('/field/block/fertilizer/user/list', {
        params: {
            fieldClass, committee
        }
    });
}