<script setup>
/**
 * 记录-详情 界面的基本信息组件
 */
import {defineProps} from "vue";
import validator from "@/assets/js/public/validator.js";
import {convertArrayToLocation} from "@/assets/js/public/convert.js";

const props = defineProps({
  detailInfo: {
    type: Object,
    required: true,
  },
})

const FertilizationRecordKeyNameMap = {
  id: '记录 ID',
  fieldBlockId: '地块 ID',
  applicationDate: '施肥日期',
  cropType: '作物类型',
  method: '施肥方法',
  weatherConditions: '天气状况',
  soilMoisture: '土壤湿度',
  notes: '备注信息',
  imageIds: '图片 ID 数组',
  location: '位置',
  createTime: '记录创建时间',
  updateTime: '记录更新时间',
}
const displayedFertilizationRecordKey = new Set([
  'id',
  // 'fieldBlockId',
  'applicationDate',
  // 'cropType',
  // 'method',
  // 'weatherConditions',
  // 'soilMoisture',
  'notes',
  // 'imageIds',
  'location',
  'createTime',
  'updateTime',
])

/**
 * 日期格式化，返回 yyyy-MM-dd HH:mm:ss
 * @param x {Date} 日期
 * @returns {string}
 */
const dateWithTime = (x) => {
  if (validator.isUndefinedOrNull(x)) return '';
  try {
    let date = new Date(x);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  } catch (e) {
    return '';
  }
}

const valueFormatter = {
  location: (x) => convertArrayToLocation(x).text,
  createTime: dateWithTime,
  updateTime: dateWithTime,
  notes: (x) => x || '未填写',
}

</script>

<template>
  <div>
    <van-cell v-for="key in displayedFertilizationRecordKey"
              :title="FertilizationRecordKeyNameMap[key]">
      <template #value>
        <div>{{ valueFormatter[key] && props.detailInfo[key] ? valueFormatter[key](props.detailInfo[key]) : props.detailInfo[key] }}</div>
      </template>
    </van-cell>
  </div>
</template>

<style scoped lang="less">

</style>