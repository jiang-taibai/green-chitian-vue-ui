<script setup>
import {onMounted, ref, watch, computed} from "vue";
import UserTabBar from "@/components/user/UserTabBar.vue";
import NavBar from "@/components/public/NavBar.vue";
import FarmlandChooseFormPickerPopup from "@/components/public/picker-popup/FarmlandChooseFormPickerPopup.vue";
import CommitteePickerPopup from "@/components/public/picker-popup/CommitteePickerPopup.vue";
import FieldClassPickerPopup from "@/components/public/picker-popup/FieldClassPickerPopup.vue";
import {queryFieldBlockFertilizerByMultiCondition} from "@/assets/js/api/api-fertilizer.js";
import {isSuccessResponse} from "@/assets/js/api/response-utils.js";
import {convertFieldName, tryConvertDecimalToFixed2} from "@/assets/js/public/convert.js";

/* ==================== 数据 ==================== */
// 建议发音：皮卡丘
const pickerShow = ref({
  committee: false,
  fieldClass: false,
  farmland: false,
})
const filterData = ref({
  committee: {
    text: '全部',
    value: void 0,
  },
  fieldClass: {
    text: '全部',
    value: void 0,
  },
  farmland: {
    text: '全部',
    value: void 0,
  },
})
/**
 * 就是使用 committee 和 fieldClass 两个字段查询出来的所有农地的数据
 * 格式为：[{text: {String}, value: {Number}, originalData: {UserFieldDetailUnion}}]
 */
const farmlandOptions = ref([])
const soilNutrientKeys = [
  'committee', 'fieldClass',
  'ctTn', 'ctTp', 'ctAk', 'ctOm',
  'ctHn', 'ctAp', 'ctTk', 'ctPh',
  'mu', 'mj'
]
/**
 * 地块字段名称
 * 来自于 {UserFieldDetailUnion} 类的字段
 */
const FieldBlockFertilizerFieldName = {
  fieldClass: '田地分类',
  committee: '村委会',
  ctTn: '总氮含量',
  ctTp: '全磷含量',
  ctAk: '速效钾含量',
  ctOm: '有机质含量',
  ctHn: '碱解氮',
  ctAp: '有效磷',
  ctTk: '全钾含量',
  ctPh: '土地PH值',
  mu: '面积（亩）',
  mj: 'MJ字段'
}
const soilNutrients = ref([])

/* ==================== 方法 ==================== */
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
 * 确认选择农田
 * @param selectedOptions 选择的农田
 */
const onConfirmFarmland = ({selectedOptions}) => {
  pickerShow.value.farmland = false;
  filterData.value.farmland = selectedOptions[0]
  soilNutrients.value = []
  soilNutrientKeys.forEach(key => {
    soilNutrients.value.push({
      name: FieldBlockFertilizerFieldName[key],
      value: tryConvertDecimalToFixed2(selectedOptions[0].originalData[key])
    })
  })
};

/**
 * 筛选，如果获得多个农地，设置默认选择第一个二次挑选
 */
const onFilter = () => {
  queryFieldBlockFertilizerByMultiCondition({
    fieldClass: filterData.value.fieldClass.value,
    committee: filterData.value.committee.value,
  }).then(/** @param res {Result<Page>} */res => {
    if (isSuccessResponse(res)) {
      const data = res.data
      farmlandOptions.value = []
      if (data.records.length > 0) {
        data.records.forEach(/** @param item {UserFieldDetailUnion} */item => {
          farmlandOptions.value.push({
            text: convertFieldName(item.committee, item.fieldClass, item.fieldId),
            value: item.fieldId,
            originalData: item,
          })
        })
        onConfirmFarmland({selectedOptions: [farmlandOptions.value[0]]})
      } else {
        farmlandOptions.value = []
        soilNutrients.value = []
      }
    }
  })
}

/* ==================== 监听 ==================== */
watch(() => filterData.value.committee, onFilter)
watch(() => filterData.value.fieldClass, onFilter)

/* ==================== 初始化 ==================== */
onMounted(() => {
  onFilter()
})

/* ==================== 计算属性 ==================== */
const existFarmland = computed(() => farmlandOptions.value.length > 0)
</script>

<template>
  <div>
    <nav-bar title="土壤养分"/>
    <div class="container">
      <van-cell-group style="margin: 0" title="地块筛选" inset>
        <van-field v-model="filterData.committee.text" is-link readonly label="委员会"
                   @click="pickerShow.committee = true"/>
        <van-field v-model="filterData.fieldClass.text" is-link readonly label="分类"
                   @click="pickerShow.fieldClass = true"/>
      </van-cell-group>
      <div v-show="existFarmland">
        <van-cell-group style="margin: 0" title="地块选择" inset>
          <van-field v-model="filterData.farmland.text" is-link readonly label="地块"
                     @click="pickerShow.farmland=true"/>
        </van-cell-group>
        <van-cell-group style="margin: 0" title="地块土壤养分" inset>
          <van-cell v-for="item in soilNutrients" :key="item.name" :title="item.name" :value="item.value"/>
        </van-cell-group>
      </div>
      <van-cell-group v-show="!existFarmland" style="margin: 20px 0 0;" inset>
        <van-empty description="暂无数据"/>
      </van-cell-group>
    </div>
    <!-- 以下为各表单的弹窗 -->
    <committee-picker-popup v-model:show="pickerShow.committee" @confirm="onConfirmCommittee"/>
    <field-class-picker-popup v-model:show="pickerShow.fieldClass" @confirm="onConfirmFieldClass"/>
    <farmland-choose-form-picker-popup v-model:show="pickerShow.farmland"
                                       :init="false" :preset-options="farmlandOptions"
                                       @confirm="onConfirmFarmland"/>
    <user-tab-bar active="farmland-data"/>
  </div>
</template>

<style scoped lang="less">
.container {
  padding: 16px;
  background: #F2F2F2;
}
</style>