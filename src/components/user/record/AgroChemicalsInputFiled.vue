<script setup>
import {ref, computed, defineProps, defineEmits, watch} from 'vue'
import {v4 as uuidv4} from 'uuid'
import validator from "@/assets/js/public/validator.js";
import AgroChemicalsTypeCascaderPopup from "@/components/user/record/AgroChemicalsTypeCascaderPopup.vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

/* =============== 父子组件传值拷贝 ================== */
const localValue = ref([...props.modelValue]);
watch(() => props.modelValue, (newValue) => {
  localValue.value = [...newValue];
});
watch(() => localValue.value, (newValue) => {
  emit('update:modelValue', newValue);
});

const activeAgroChemicalsItem = ref([])

const dosageUnitChooseForm = {
  /**
   * 当前编辑的农化产品的索引
   */
  editIndex: 0,
  /**
   * 选择的农化产品的用量单位
   */
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
  localValue.value[dosageUnitChooseForm.editIndex].dosageUnitText = selectedOptions[0].text;
  localValue.value[dosageUnitChooseForm.editIndex].dosageUnitValue = selectedOptions[0].value;
};

const addAgroChemicalsItem = () => {
  localValue.value.push({
    agroChemicals: {},
    dosageNumber: 0.0,
    dosageUnitText: '千克',
    dosageUnitValue: 'kg',
    uuid: uuidv4()
  })
}

const removeAgroChemicalsItem = (index) => {
  localValue.value.splice(index, 1)
}

const collapseItemTitles = computed(() => {
  return localValue.value.map(agroChemicalsInfo => {
    const agroChemicals = validator.isEmptyString(agroChemicalsInfo.agroChemicals.name) ? '未知化肥/农药' : agroChemicalsInfo.agroChemicals.name
    return `${agroChemicals} ${agroChemicalsInfo.dosageNumber} ${agroChemicalsInfo.dosageUnitText}`
  })
})
</script>

<template>
  <div>
    <van-collapse v-model="activeAgroChemicalsItem">
      <van-collapse-item class="collapse-item"
                         v-for="(agroChemicalsInfo, index) in localValue"
                         :name="agroChemicalsInfo.uuid" :key="agroChemicalsInfo.uuid">
        <template #title>
          <span class="global-truncate-multiline _3">{{ collapseItemTitles[index] }}</span>
        </template>
        <agro-chemicals-type-cascader-popup v-model="agroChemicalsInfo.agroChemicals" required/>
        <van-field v-model="agroChemicalsInfo.dosageNumber" required
                   type="number" label="用量" placeholder="请输入用量"/>
        <van-field v-model="agroChemicalsInfo.dosageUnitText" is-link readonly required
                   label="用量单位" placeholder="请选择用量单位"
                   @click="displayDosageUnitChooseForm(index)"/>
        <div class="remove-agro-btn-wrapper">
          <van-button type="danger" size="small" block
                      @click="removeAgroChemicalsItem(index)">删除
          </van-button>
        </div>
      </van-collapse-item>
      <van-button type="default" size="small" block class="add-agro-btn"
                  @click="addAgroChemicalsItem">添加农化产品
      </van-button>
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

.remove-agro-btn-wrapper {
  padding: 0 16px 16px;
}

.collapse-item {
  :deep(.van-collapse-item__content) {
    padding: 0 !important;
  }

  :deep(.van-collapse-item__title) {
    font-weight: bold;
  }
}
</style>