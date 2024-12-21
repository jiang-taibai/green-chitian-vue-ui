<script setup>
import {ref, computed} from 'vue';
import RecordFilterFormActionSheet from "@/components/user/record/RecordFilterFormActionSheet.vue";
import RecordCardList from "@/components/user/record/RecordCardList.vue";
import NavBar from "@/components/public/NavBar.vue";

const recordFilterFormActionSheetShow = ref(false);
const recordFilterFormActionSheetData = ref({
  farmlandText: "所有农田",
  farmlandValue: void 0,
  dateText: "所有时间段",
  dateStart: "",
  dateEnd: "",
});
const recordFilterFormActionSheetFormValue = computed(() => {
  return `${recordFilterFormActionSheetData.value.farmlandText} ${recordFilterFormActionSheetData.value.dateText}`;
});
</script>

<template>
  <nav-bar title="记录 - 首页"/>
  <div class="container">
    <div class="action">
      <van-field v-model="recordFilterFormActionSheetFormValue" is-link readonly
                 label="筛选：" label-width="3em" placeholder="请选择筛选方式"
                 @click="recordFilterFormActionSheetShow=true"/>
      <van-button style="margin-top: 8px"
                  type="primary" block round size="small" to="/user/record/upload">添加记录
      </van-button>
    </div>
    <record-card-list :filter-data="recordFilterFormActionSheetData"/>
    <record-filter-form-action-sheet v-model:show="recordFilterFormActionSheetShow"
                                     v-model:filterData="recordFilterFormActionSheetData"/>
    <van-back-top bottom="10vh"/>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  background: #F2F2F2;
}

.action {
  margin-bottom: 20px;
  padding: 20px 20px;
  border-radius: 8px;
  box-shadow: rgba(14, 63, 126, 0.04) 0 0 0 1px, rgba(42, 51, 69, 0.04) 0 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0 6px 6px -3px, rgba(14, 63, 126, 0.04) 0 12px 12px -6px, rgba(14, 63, 126, 0.04) 0 24px 24px -12px;
  background: #FFFFFF;
}
</style>