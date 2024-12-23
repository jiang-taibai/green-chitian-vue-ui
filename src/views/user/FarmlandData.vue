<script setup>
import {computed, ref} from "vue";
import UserTabBar from "@/components/user/UserTabBar.vue";
import NavBar from "@/components/public/NavBar.vue";
import FarmlandChooseFormPickerPopup from "@/components/public/picker-popup/FarmlandChooseFormPickerPopup.vue";
import CommitteePickerPopup from "@/components/public/picker-popup/CommitteePickerPopup.vue";
import FieldClassPickerPopup from "@/components/public/picker-popup/FieldClassPickerPopup.vue";

const pickerShow = ref({
  farmland: false,
  committee: false,
  fieldClass: false,
  secondPickerFarmland: false,
})
const filterData = ref({
  farmland: {
    text: '全部',
    value: void 0,
  },
  committee: {
    text: '全部',
    value: void 0,
  },
  fieldClass: {
    text: '全部',
    value: void 0,
  },
  secondPickerFarmland: {
    text: '',
    value: void 0,
  }
})
const secondPickerFarmlandOptions = ref([])
const soilNutrients = ref([
  {name: "坐标", value: 0},
  {name: "氮", value: "0.1g/kg"},
  {name: "磷", value: "0.2g/kg"},
  {name: "钾", value: "0.3g/kg"},
  {name: "有机质", value: "0.4g/kg"},
  {name: "PH", value: "5.6"},
  {name: "水分", value: "20%"},
  {name: "温度", value: "20℃"},
])

/**
 * 确认选择农田
 * @param selectedOptions 选择的农田
 */
const onConfirmFarmland = ({selectedOptions}) => {
  pickerShow.value.farmland = false;
  filterData.value.farmland = selectedOptions[0]
};
/**
 * 确认选择委员会
 * @param selectedOptions 选择的委员会
 */
const onConfirmCommittee = ({selectedOptions}) => {
  pickerShow.value.committee = false;
  filterData.value.committee = selectedOptions[0]
};
/**
 * 确认选择田块分类
 * @param selectedOptions 选择的田块分类
 */
const onConfirmFieldClass = ({selectedOptions}) => {
  pickerShow.value.fieldClass = false;
  filterData.value.fieldClass = selectedOptions[0]
};
/**
 * 第二次挑选农田
 * @param selectedOptions
 */
const onSecondConfirmFarmland = ({selectedOptions}) => {
  pickerShow.value.secondPickerFarmland = false;
  filterData.value.secondPickerFarmland = selectedOptions[0]
};

/**
 * 筛选，如果获得多个农地，设置默认选择第一个二次挑选
 */
const doFilter = () => {
  console.log(filterData.value)
}
/**
 * 二次挑选农地时触发
 */
const fetchFieldBlockFertilizer = () => {
  console.log('fetchFieldBlockFertilizer')
}

/* =============== 计算属性 ================== */
const selectedFarmland = computed(() => filterData.value.farmland.value !== void 0)
</script>

<template>
  <div>
    <nav-bar title="土壤养分"/>
    <div class="container">
      <van-cell-group style="margin: 0" title="地块筛选" inset>
        <van-field v-model="filterData.farmland.text" is-link readonly label="地块"
                   @click="pickerShow.farmland = true"/>
        <van-field v-show="!selectedFarmland" v-model="filterData.committee.text" is-link readonly label="委员会"
                   @click="pickerShow.committee = true"/>
        <van-field v-show="!selectedFarmland" v-model="filterData.fieldClass.text" is-link readonly label="分类"
                   @click="pickerShow.fieldClass = true"/>
      </van-cell-group>
      <van-cell-group style="margin: 0" title="地块选择" inset>
        <van-field v-model="filterData.farmland.text" is-link readonly label="地块"/>
      </van-cell-group>
      <van-cell-group style="margin: 0" title="地块土壤养分" inset>
        <van-cell v-for="item in soilNutrients" :key="item.name" :title="item.name" :value="item.value"/>
      </van-cell-group>
    </div>
    <farmland-choose-form-picker-popup v-model:show="pickerShow.farmland" @confirm="onConfirmFarmland"/>
    <committee-picker-popup v-model:show="pickerShow.committee" @confirm="onConfirmCommittee"/>
    <field-class-picker-popup v-model:show="pickerShow.fieldClass" @confirm="onConfirmFieldClass"/>
    <farmland-choose-form-picker-popup v-model:show="pickerShow.secondPickerFarmland" :init="false"
                                       :preset-options="secondPickerFarmlandOptions"
                                       @confirm="onSecondConfirmFarmland"/>
    <user-tab-bar active="farmland-data"/>
  </div>
</template>

<style scoped lang="less">
.container {
  padding: 16px;
  background: #F2F2F2;
}

.location {
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;

  .location-filed {
    font-size: var(--van-cell-font-size);
    padding: 0 10px 10px;
  }
}
</style>