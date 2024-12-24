import {createAxiosInstance} from "@/assets/js/api/axios-wrapper.js";
import {tianDiTuToken} from "@/assets/js/secret/index.js";

// 别骂了，官网 天地图 英文翻译就是 tianditu
const apiTianditu = createAxiosInstance({
    baseURL: 'http://api.tianditu.gov.cn',
    timeout: 20000,
    useToken: false,
})

export const getLocationText = (latitude, longitude) => {
    const postStr = {
        lon: longitude,
        lat: latitude,
        ver: 1
    }
    return apiTianditu.get('/geocoder', {
        params: {
            postStr: JSON.stringify(postStr),
            type: 'geocode',
            tk: tianDiTuToken,
        }
    });
}