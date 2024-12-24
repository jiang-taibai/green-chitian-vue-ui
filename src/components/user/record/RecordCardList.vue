<script setup>
import {computed, defineProps, ref, watch} from "vue";
import RecordCard from "@/components/user/record/RecordCard.vue";
import {getFertilizations} from "@/assets/js/api/api-record.js";
import {isSuccessResponse} from "@/assets/js/api/response-utils.js";
import {getImage} from "@/assets/js/api/api-file.js";
import validator from "@/assets/js/public/validator.js";

/* ============== 参数 ============== */
const props = defineProps({
  filterData: {
    type: Object,
    default: () => ({
      farmlandText: "所有农田",
      farmlandValue: void 0,
      dateText: "所有时间段",
      dateStart: "",
      dateEnd: "",
    }),
  },
});

/* ============== 数据 ============== */
/**
 * @type {import('vue').Ref<UnwrapRef<FertilizationRecord[]>, UnwrapRef<FertilizationRecord[]> | FertilizationRecord[]>}
 */
const records = ref([]);
/**
 * @type {[{}] extends [import('vue').Ref] ? IfAny<{}, import('vue').Ref<{}>, {}> : import('vue').Ref<UnwrapRef<{}>, UnwrapRef<{}> | {}>}
 */
const covers = ref({});
const loading = ref(false);
const pagination = ref({
  current: 0,
  size: 10,
  pages: 100,
  total: 100,
});

/* ============== 方法 ============== */
/**
 * 查询记录
 */
const queryRecords = () => {
  loading.value = true;
  getFertilizations({
    fieldId: props.filterData.farmlandValue,
    size: pagination.value.size,
    current: pagination.value.current + 1,
    startDate: props.filterData.dateStart,
    endDate: props.filterData.dateEnd,
  }).then(/** @param res {Result<Page<FertilizationRecord>>} */(res) => {
    if (!isSuccessResponse(res)) {
      return;
    }
    const data = res.data;
    pagination.value = {
      current: data.current,
      pages: data.pages,
      total: data.total,
    }
    for (let record of data.records) {
      if (validator.isEmptyArray(record.imageIds)) {
        covers.value[record.id] = void 0;
        continue;
      }
      // 如果已经获取过封面图片，则跳过
      // 出现场景：比如说查询多次，可能会重复获取图片
      if (covers.value[record.id]) {
        continue;
      }
      const imageId = record.imageIds[0]
      getImage(imageId).then((res) => {
        try {
          covers.value[record.id] = URL.createObjectURL(res);
        } catch (e) {
          covers.value[record.id] = void 0;
          console.error("获取图片失败：", e);
          console.error("图片ID：", imageId);
        }
      });
    }
    records.value.push(...data.records);
  }).finally(() => {
    loading.value = false;
  });
}

/**
 * 加载更多，当滚动到底部时触发
 */
const onLoad = () => {
  if (finished.value) {
    return;
  }
  queryRecords();
};

/**
 * 重置分页配置和数据
 */
const resetQueryFormAndData = () => {
  pagination.value = {
    current: 0,
    size: 10,
    pages: 100,
    total: 100,
  };
  records.value = [];
}

/* ============== 监听 ============== */
/**
 * 监听：当筛选条件变化时，重置分页配置和数据，然后查询记录
 */
watch(() => props.filterData, () => {
  resetQueryFormAndData();
  queryRecords();
}, {immediate: true});

/* ============== 计算属性 ============== */
const finished = computed(() => {
  return pagination.value.current >= pagination.value.pages;
});
</script>

<template>
  <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <record-card class="list-item" v-for="(item, idx) in records" :key="item.id"
                 :id="item.id" :cover="covers[item.id]" :date="item.applicationDate" :farmland="item.feildName"
                 :agroChemicals="item.fertilizerName" :dosageNumber="item.quantityUsed"
                 :dosageUnit="item.unit" :note="item.notes"/>
  </van-list>
</template>

<style scoped>
.list-item {
  margin-bottom: 20px;
}
</style>