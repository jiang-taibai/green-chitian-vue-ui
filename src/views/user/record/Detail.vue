<script setup>
import {computed} from 'vue';
import {useRoute} from 'vue-router';

import recordImageDemo01 from "@/assets/img/record/demo-01.jpg";
import recordImageDemo02 from "@/assets/img/record/demo-02.jpg";
import recordImageDemo03 from "@/assets/img/record/demo-03.jpg";
import recordImageDemo04 from "@/assets/img/record/demo-04.jpg";
import recordImageDemo05 from "@/assets/img/record/demo-05.jpg";
import HorizontalScrollImages from "@/components/public/HorizontalScrollImages.vue";

import TMap from "@/components/public/TMap.vue";

const route = useRoute();

const recordId = computed(() => route.params.id);

const detailInfo = {
  id: recordId.value,
  images: [recordImageDemo01, recordImageDemo02, recordImageDemo03, recordImageDemo04, recordImageDemo05],
  farmland: "未知农田",
  date: "2021-01-01 00:00:00",
  agroChemicals: "未知化肥/农药",
  dosageNumber: 0.00,
  dosageUnit: "g",
  note: "无备注信息",
  latitude: 30.290756,
  longitude: 120.074387,
};
const coordinateText = computed(() => `${detailInfo.latitude.toFixed(6)}, ${detailInfo.longitude.toFixed(6)}`);
const coordinateTMapObject = computed(() => {
  return {
    latitude: detailInfo.latitude,
    longitude: detailInfo.longitude,
  };
});

const back = () => history.back();
</script>

<template>
  <div>
    <van-nav-bar title="记录 - 详情" left-text="返回" left-arrow @click-left="back" fixed placeholder/>
    <div class="container">
      <div class="group">
        <div class="group-title">图片</div>
        <div class="group-content">
          <div class="img-group">
            <horizontal-scroll-images :images="detailInfo.images"/>
          </div>
        </div>
      </div>
      <div class="group">
        <div class="group-title">记录位置</div>
        <div class="group-content">
          <t-map :coordinate="coordinateTMapObject"/>
        </div>
      </div>
      <div class="group">
        <div class="group-title">详细信息</div>
        <div class="group-content">
          <van-cell title="记录 ID" :value="detailInfo.id"/>
          <van-cell title="农田" :value="detailInfo.farmland"/>
          <van-cell title="日期" :value="detailInfo.date"/>
          <van-cell title="农药/化肥" :value="detailInfo.agroChemicals"/>
          <van-cell title="用量" :value="`${detailInfo.dosageNumber.toFixed(2)}(${detailInfo.dosageUnit})`"/>
          <van-cell title="备注" :value="detailInfo.note"/>
          <van-cell title="位置" :value="coordinateText"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  background-color: #f7f7f7;
  padding: 16px;
}

.group {
  margin-bottom: 20px;

  &-title {
    padding: 10px;
    font-weight: bold;
    font-size: 16px;
    color: #333;
  }

  &-content {
    padding: 16px;
    border-radius: 8px;
    background-color: #fff;
  }
}
</style>