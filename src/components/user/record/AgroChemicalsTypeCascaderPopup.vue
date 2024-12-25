<script setup>
/**
 * 用于农化产品的级联选择器
 */
import {defineProps, defineEmits, ref, watch, onMounted} from 'vue';
import {getAllFertilizations} from "@/assets/js/api/api-record.js";
import {isSuccessResponse} from "@/assets/js/api/response-utils.js";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      return {
        id: '',
        name: '',
      }
    },
  },
  required: {
    type: Boolean,
    default: false,
  }
})
const emit = defineEmits(['update:modelValue']);
const localValue = ref(props.modelValue);
watch(() => props.modelValue, (newValue) => {
  localValue.value = {...newValue};
});
watch(() => localValue.value, (newValue) => {
  emit('update:modelValue', newValue);
});

const show = ref(false);
const options = ref([])

const onFinish = ({selectedOptions}) => {
  localValue.value.id = selectedOptions[selectedOptions.length - 1].value;
  localValue.value.name = selectedOptions.map((option) => option.text).join('/');
  show.value = false;
}

onMounted(() => {
  init();
})
const init = () => {
  initOptions();
}
/**
 * 初始化选项
 */
const initOptions = () => {
  getAllFertilizations().then(/** @param res {Result<FertilizerType>} */res => {
    if (isSuccessResponse(res)) {
      const fertilizations = res.data;
      options.value = generateOptions(fertilizations);
    }
  });
}

/**
 * 生成级联选择器的选项
 * @param fertilizations {FertilizerType[]} 农化产品类型列表
 */
const generateOptions = (fertilizations) => {
  if (fertilizations.length === 0) {
    return [];
  }
  const fertilizationList = [];
  fertilizations.forEach(/** @param item {FertilizerType} */item => {
    // 如果是叶子节点，不再递归，当前节点下的 fertilizers 为该节点的农化产品
    if (item.children.length === 0) {
      const fertilization = {
        text: item.typeName,
        value: item.id,
        children: [],
      };
      item.fertilizers.forEach(/** @param fertilizer {Fertilizer} */fertilizer => {
        fertilization.children.push({
          text: fertilizer.name,
          value: fertilizer.id,
        });
      });
      fertilizationList.push(fertilization);
    } else {
      fertilizationList.push({
        text: item.typeName,
        value: item.id,
        children: generateOptions(item.children),
      });
    }
  });
  return fertilizationList;
}
</script>

<template>
  <div>
    <van-field v-model="localValue.name" is-link readonly :required="props.required"
               label="农药/化肥" placeholder="请选择农药/化肥" @click="show = true"/>
    <van-field v-show="localValue.id" v-model="localValue.name" required
               label="具体名称" placeholder="请输入具体名称"/>
    <van-popup v-model:show="show" round position="bottom">
      <van-cascader title="请选择所在农药/化肥" :options="options"
                    @close="show = false" @finish="onFinish"/>
    </van-popup>
  </div>
</template>

<style scoped lang="less">

</style>