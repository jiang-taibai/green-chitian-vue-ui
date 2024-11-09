<script setup>
import {ref, computed} from 'vue'

const activeAgroChemicalsItem = ref([])
const agroChemicalsInfos = ref([
  {agroChemicals: '尿素', dosageNumber: '10', dosageUnitText: '千克', dosageUnitValue: 'kg', uuid: '1'},
  {agroChemicals: '有机肥', dosageNumber: '20', dosageUnitText: '千克', dosageUnitValue: 'kg', uuid: '2'},
  {agroChemicals: '杀虫剂', dosageNumber: '30', dosageUnitText: '毫升', dosageUnitValue: 'ml', uuid: '3'},
])

const dosageUnitChooseForm = {
  editIndex: 0,
  options: [
    {text: "千克", value: "kg"},
    {text: "克", value: "g"},
    {text: "斤", value: "jin"},
    {text: "升", value: "l"},
    {text: "毫升", value: "ml"},
  ]
}
const showDosageUnitPopup = ref(false);
const displayDosageUnitChooseForm = (index) => {
  dosageUnitChooseForm.editIndex = index;
  showDosageUnitPopup.value = true;
}
const onDosageUnitChooseFinish = ({selectedOptions}) => {
  showDosageUnitPopup.value = false;
  agroChemicalsInfos.value[dosageUnitChooseForm.editIndex].dosageUnitText = selectedOptions[0].text;
  agroChemicalsInfos.value[dosageUnitChooseForm.editIndex].dosageUnitValue = selectedOptions[0].value;
};

const collapseItemTitles = computed(() => {
  return agroChemicalsInfos.value.map(agroChemicalsInfo => {
    return `${agroChemicalsInfo.agroChemicals} ${agroChemicalsInfo.dosageNumber}(${agroChemicalsInfo.dosageUnitText})`
  })
})
</script>

<template>
  <div>
    <van-collapse v-model="activeAgroChemicalsItem">
      <van-collapse-item class="collapse-item"
                         v-for="(agroChemicalsInfo, index) in agroChemicalsInfos"
                         :name="agroChemicalsInfo.uuid" :key="agroChemicalsInfo.uuid"
                         :title="collapseItemTitles[index]">
        <van-field v-model="agroChemicalsInfo.agroChemicals" required
                   label="农药/化肥" placeholder="请输入农药/化肥"/>
        <van-field v-model="agroChemicalsInfo.dosageNumber" required
                   type="number" label="用量" placeholder="请输入用量"/>
        <van-field v-model="agroChemicalsInfo.dosageUnitText" is-link readonly required
                   label="用量单位" placeholder="请选择用量单位"
                   @click="displayDosageUnitChooseForm(index)"/>
      </van-collapse-item>
      <van-button type="success" size="small" block class="add-agro-btn">添加农化产品</van-button>
    </van-collapse>
    <van-popup v-model:show="showDosageUnitPopup" round position="bottom">
      <van-picker :columns="dosageUnitChooseForm  .options"
                  @cancel="dosageUnitChooseForm.show = false" @confirm="onDosageUnitChooseFinish"/>

    </van-popup>
  </div>
</template>

<style scoped lang="less">
.add-agro-btn {
  margin-top: 10px;
}

.collapse-item {
  /deep/ .van-collapse-item__content {
    padding: 0 !important;
  }

  /deep/ .van-collapse-item__title {
    font-weight: bold;
  }
}
</style>