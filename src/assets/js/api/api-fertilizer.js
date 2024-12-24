import {createAxiosInstance} from "@/assets/js/api/axios-wrapper.js";
import {API_URL} from "@/assets/js/api/config.js";

const api = createAxiosInstance({
    baseURL: API_URL,
    timeout: 5000,
    useToken: true,
});

export const queryFieldBlockFertilizerByMultiCondition = ({fieldClass, committee}) => {
    return api.get('/field/block/fertilizer/user/page', {
        params: {
            fieldClass, committee
        }
    });
}