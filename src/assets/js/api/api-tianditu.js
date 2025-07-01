import {createAxiosInstance} from "@/assets/js/api/axios-wrapper.js";
import {TIAN_DI_TU_TOKEN} from "@/assets/js/secret/index.js";

// 别骂了，官网 天地图 英文翻译就是 tianditu
const apiTianditu = createAxiosInstance({
    baseURL: 'http://api.tianditu.gov.cn',
    timeout: 20000,
    useToken: false,
})

/*
{
    "result": {
        "formatted_address": "北京市西城区西什库大街31号院23东方开元信息科技公司",
        "location": {
            "lon": 116.37304,
            "lat": 39.92594
        },
        "addressComponent": {
            "address": "西什库大街31号院23",
            "city": "北京市西城区",
            "road": "大红罗厂街",
            "poi_position": "东北",
            "address_position": "东北",
            "road_distance": 49,
            "poi": "东方开元信息科技公司",
            "poi_distance": "38",
            "address_distance": 38
        }
    },
    "msg": "ok",
    "status": "0"
}
 */
/**
 * 根据经纬度获取地址，参考文档：http://lbs.tianditu.gov.cn/server/geocoding.html
 * @param latitude  纬度
 * @param longitude 经度
 * @returns {Promise<LocationTextResponce>}
 */
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
            tk: TIAN_DI_TU_TOKEN,
        }
    });
}

/*
{
    "location": {
        "lon": "116.001688",
        "level": "地名地址",
        "lat": "40.453228"
    },
    "status": "0",
    "msg": "ok",
    "searchVersion": "4.8.0"
}
 */
/**
 * 根据地址获取经纬度，参考文档：http://lbs.tianditu.gov.cn/server/geocodinginterface.html
 * @param address   地址
 * @returns {Promise<LocationResponse>}
 */
export const getLocationByAddress = (address) => {
    const ds = {
        keyWord: address
    }
    return apiTianditu.get('/geocoder', {
        params: {
            ds: JSON.stringify(ds),
            tk: TIAN_DI_TU_TOKEN,
        }
    });
}

/**
 * @typedef {Object} Location
 * @property {string} lon   经度
 * @property {string} lat   纬度
 * @property {string} level 类别名称
 * @property {string} typeRound 附近相似点
 */

/**
 * @typedef {TianDiTuResponse} LocationResponse
 * @property {Location} location    位置信息
 */


/**
 * @typedef {Object} LocationTextResult
 * @property {string} formatted_address    格式化地址
 * @property {Location} location           位置信息
 * @property {Object} addressComponent     地址组件
 */

/**
 * @typedef {TianDiTuResponse} LocationTextResponce
 * @property {LocationTextResult} result   位置信息
 */

/**
 * @typedef {Object} TianDiTuResponse
 * @property {string} status   0：正常返回，101：结果为空，404：出错。
 * @property {string} msg      返回状态说明
 */