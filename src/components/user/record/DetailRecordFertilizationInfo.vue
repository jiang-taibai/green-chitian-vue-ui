<script setup>
/**
 * 记录-详情 界面的施肥信息组件
 */
import {defineProps} from "vue";
import validator from "@/assets/js/public/validator.js";

const props = defineProps({
  fertilizerCard: {
    /** @type {import('@/assets/js/public/types').FertilizerCardDto}*/
    type: Object,
    required: true,
  },
})

const FertilizerCardKeyNameMap = {
  id: '卡片 ID',
  unit: '用量单位',
  fertilizerTypeId: '肥料类型 ID',
  fertilizerName: '肥料名称',
  recordId: '施肥记录 ID',
  applicationUsed: '施肥用量',
}

const displayedFertilizerCardKey = new Set([
  'fertilizerName',
  'applicationUsed',
  'unit',
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
  fertilizerName: (x) => x || '未填写',
  applicationUsed: (x) => x.toFixed(2),
}

</script>

<template>
  <div>
    <van-cell v-for="key in displayedFertilizerCardKey"
              :title="FertilizerCardKeyNameMap[key]">
      <template #value>
        <div>{{ valueFormatter[key] && props.fertilizerCard[key] ? valueFormatter[key](props.fertilizerCard[key]) : props.fertilizerCard[key] }}</div>
      </template>
    </van-cell>
  </div>
</template>

<style scoped lang="less">

</style>