import validator from "@/assets/js/public/validator.js";
import {convertDateToYYYYMMDD, convertLocationToArray} from "@/assets/js/public/convert.js";
import {uploadImage} from "@/assets/js/api/api-file.js";
import {isSuccessResponse} from "@/assets/js/api/response-utils.js";
import {uploadFertilization} from "@/assets/js/api/api-record.js";

/**
 * 提交表单
 *
 */
const onUploadRecord = async ({farmlandChooseForm, agroChemicalInfos, note, fileList, location}) => {
    try {
        await checkCommit(farmlandChooseForm, agroChemicalInfos);
        /**
         * 农药化肥记录的 DTO
         * @type {import('@/assets/js/public/types').FertilizationRecordDto}
         */
        const fertilizationRecordDto = initFertilizationRecordDto(farmlandChooseForm, note, location);
        const imageIds = await uploadImages(fileList);
        /**
         * 农药化肥记录的 DTO
         * @type {FertilizerCardDto[]}
         */
        const fertilizerCards = initFertilizerCards(agroChemicalInfos);
        fertilizationRecordDto.imageIds = imageIds;
        fertilizationRecordDto.fertilizerCards = fertilizerCards;
        return uploadFertilization(fertilizationRecordDto)
    } catch (e) {
        return Promise.reject(e);
    }
}

/**
 * 检查提交的表单是否合法
 * 如果表单验证失败，将返回带有错误信息的 Promise
 */
const checkCommit = async (farmlandChooseForm, agroChemicalInfos) => {
    return new Promise((resolve, reject) => {
        // 必须选择农田
        if (validator.isUndefinedOrNull(farmlandChooseForm.value)) {
            return reject(new Error('请选择农田'));
        }
        // 至少添加一条农药/化肥记录
        if (validator.isEmptyArray(agroChemicalInfos)) {
            return reject(new Error('请添加农药/化肥记录'));
        }
        // 如果添加了农药/化肥记录，必须选择农化产品，并填写名称
        for (let i = 0; i < agroChemicalInfos.length; i++) {
            if (validator.isUndefinedOrNull(agroChemicalInfos[i].agroChemicals.id)) {
                return reject(new Error('第 ' + (i + 1) + ' 条农药/化肥记录未选择农化产品'));
            }
            if (validator.isEmptyString(agroChemicalInfos[i].agroChemicals.name)) {
                return reject(new Error('第 ' + (i + 1) + ' 条农药/化肥记录未填写农化产品名称'));
            }
        }
        return resolve();
    })
}

/**
 * 初始化农药化肥记录的 DTO
 */
const initFertilizationRecordDto = (farmlandChooseForm, note, location) => {
    /**
     * 农药化肥记录的 DTO
     * @type {import('@/assets/js/public/types').FertilizationRecordDto}
     */
    const fertilizationRecordDto = {}
    fertilizationRecordDto.fieldBlockId = farmlandChooseForm.value;
    fertilizationRecordDto.applicationDate = convertDateToYYYYMMDD(new Date());
    fertilizationRecordDto.notes = note;
    fertilizationRecordDto.imageIds = [];
    fertilizationRecordDto.location = convertLocationToArray(location);
    fertilizationRecordDto.fertilizerCards = [];
    return fertilizationRecordDto;
}

/**
 * 上传图片
 */
const uploadImages = async (fileList) => {
    const imageIds = [];
    for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i].file;
        const res = await uploadImage(file);
        if (isSuccessResponse(res)) {
            imageIds.push(res.data);
        } else {
            console.error(res.message);
        }
    }
    return imageIds;
}

/**
 * 初始化农药化肥记录的 DTO
 * @returns {FertilizerCardDto[]}
 */
const initFertilizerCards = (agroChemicalInfos) => {
    return agroChemicalInfos.map(item => {
        return {
            unit: item.dosageUnitValue,
            fertilizerTypeId: item.agroChemicals.id,
            fertilizerName: item.agroChemicals.name,
            applicationUsed: item.dosageNumber,
        }
    })
}

export {
    onUploadRecord
}