import {ApiBuilder} from "@/assets/js/api/basic.js";
import {tianDiTuToken} from "@/assets/js/secret/index.js";

// 别骂了，官网 天地图 英文翻译就是 tianditu
const tianDiTuApi = new ApiBuilder('http://api.tianditu.gov.cn')

const response_on_error = (err) => {
    console.log('请求失败，请检查网络连接或联系管理员。错误原因：' + err.message);
}

export const getLocationText = async (latitude, longitude) => {
    try {
        const postStr = {
            lon: longitude,
            lat: latitude,
            ver: 1
        }
        const res = await tianDiTuApi.get('/geocoder', {
            postStr: JSON.stringify(postStr),
            type: 'geocode',
            tk: tianDiTuToken,
        })
        return res.data;
    } catch (error) {
        response_on_error(error);
        throw error;
    }
}