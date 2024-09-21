<script setup>
import {ref} from "vue";
import {v4 as uuid} from 'uuid';
import recordCoverDemo01 from "@/assets/img/record/demo-01.jpg";
import RecordCard from "@/components/user/record/RecordCard.vue";

const list = ref([]);
const loading = ref(false);
const finished = ref(false);

const demoData = () => {
  return {
    id: uuid(),
    cover: recordCoverDemo01,
    date: "2021-01-01 00:00:00",
    farmland: "未知农田",
    agroChemicals: "未知化肥/农药",
    dosageNumber: 0.00,
    dosageUnit: "g",
    note: "无备注信息"
  };
};

const onLoad = () => {
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      list.value.push(demoData());
    }
    loading.value = false;
    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 300);
};
</script>

<template>
  <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <record-card class="list-item" v-for="item in list" :key="item.id"
                 :id="item.id" :cover="item.cover" :date="item.date" :farmland="item.farmland"
                 :agroChemicals="item.agroChemicals" :dosageNumber="item.dosageNumber"
                 :dosageUnit="item.dosageUnit" :note="item.note"/>
  </van-list>
</template>

<style scoped>
.list-item {
  margin-bottom: 20px;
}
</style>