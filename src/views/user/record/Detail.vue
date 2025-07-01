<script setup>
import {computed, ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';

import HorizontalScrollImages from "@/components/public/HorizontalScrollImages.vue";

import TMap from "@/components/public/TMap.vue";
import NavBar from "@/components/public/NavBar.vue";
import {getFertilizationRecordById} from "@/assets/js/api/api-record.js";
import {isSuccessResponse} from "@/assets/js/api/response-utils.js";
import {showFailToast} from "@/assets/js/plugins/vant-toast.js";
import {convertArrayToLocation} from "@/assets/js/public/convert.js";
import DetailRecordBasicInfo from "@/components/user/record/DetailRecordBasicInfo.vue";
import DetailRecordFertilizationInfo from "@/components/user/record/DetailRecordFertilizationInfo.vue";

const route = useRoute();

const recordId = computed(() => route.params.id);

const detailInfo = ref({})
const coordinate = ref({latitude: 0.0, longitude: 0.0});

const fetchRecordDetail = () => {
  getFertilizationRecordById(recordId.value).then(/** @param res {Result<import('@/assets/js/public/types').FertilizationRecordDto>} */async res => {
    if (!isSuccessResponse(res)) {
      showFailToast(res.message);
    }
    /** @type {import('@/assets/js/public/types').FertilizationRecordDto} */
    detailInfo.value = res.data;
    coordinate.value = convertArrayToLocation(detailInfo.value.location);
  });
};

onMounted(() => {
  fetchRecordDetail();
});
</script>

<template>
  <div>
    <nav-bar title="记录 - 详情" back/>
    <div class="container">
      <div class="group">
        <div class="group-title">图片</div>
        <div class="group-content">
          <div class="img-group">
            <horizontal-scroll-images :image-ids="detailInfo.imageIds"/>
          </div>
        </div>
      </div>
      <div class="group">
        <div class="group-title">记录位置</div>
        <div class="group-content">
          <t-map :coordinate="coordinate"/>
        </div>
      </div>
      <div class="group">
        <div class="group-title">详细信息</div>
        <div class="group-content">
          <detail-record-basic-info :detail-info="detailInfo"/>
        </div>
      </div>
      <div class="group">
        <div class="group-title">施肥信息</div>
        <div class="group-content" v-for="fertilizerCard in detailInfo.fertilizerCards">
          <detail-record-fertilization-info :fertilizer-card="fertilizerCard"/>
        </div>
        <van-empty v-if="detailInfo?.fertilizerCards?.length === 0" description="暂无施肥信息"/>
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
  display: flex;
  flex-direction: column;
  gap: 20px;

  &-title {
    padding: 0 10px;
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