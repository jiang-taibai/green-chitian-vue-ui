<script setup>
import {defineProps, defineEmits, onMounted, ref, watch, computed} from 'vue';
import {userFields} from "@/assets/js/api/api-record.js";
import {isSuccessResponse} from "@/assets/js/api/response-utils.js";
import {convertFieldName} from "@/assets/js/public/convert.js";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  init: {
    type: Boolean,
    default: true,
  },
  /**
   * 当 init 为 false 时，需要传入 presetOptions 作为预设选项
   * 预设选项可变，格式为 [{text: string, value: any}]
   */
  presetOptions: {
    type: Array,
    default: () => [],
    validator(value, props) {
      if (props.init) {
        return true;
      }
      return value.every(item => item.text && item.value);
    }
  }
})
const emit = defineEmits(['update:show', 'confirm']);

/* =============== 数据 ================== */
const localShow = ref(props.show)
const localPresetOptions = ref(props.presetOptions)
const options = ref([])

/* =============== 父子组件传值监听 ================== */
watch(() => props.show, (newValue) => {
  localShow.value = newValue
})
watch(() => localShow.value, (newValue) => {
  emit('update:show', newValue)
})
watch(() => props.presetOptions, (newValue) => {
  localPresetOptions.value = newValue
})

/* =============== 方法 ================== */
const onConfirm = ({selectedOptions}) => {
  emit('update:show', false);
  emit('confirm', {selectedOptions});
}
const onCancel = () => {
  emit('update:show', false);
}
const onClose = () => {
  emit('update:show', false);
}

/* =============== 初始化 ================== */
onMounted(() => {
  init();
})
const init = () => {
  if (props.init) {
    initFarmlands();
  }
}
/**
 * 初始化农田选项
 */
const initFarmlands = () => {
  userFields().then(res => {
    if (isSuccessResponse(res)) {
      const farmlandList = [{
        text: '全部',
        value: void 0,
        originalData: void 0,
      }];
      res.data.forEach(/** @param item {Field} */item => {
        farmlandList.push({
          text: convertFieldName(item.committee, item.fieldClass, item.id),
          value: item.id,
          originalData: item,
        });
      });
      options.value = farmlandList;
    }
  });
}

/* =============== 计算属性 ================== */
/**
 * 真实选项，如果 init 为 true，则为 options，否则为 presetOptions
 */
const realOptions = computed(() => {
  return props.init ? options.value : localPresetOptions.value;
})
</script>

<template>
  <div>
    <van-popup v-model:show="localShow" round close-on-click-overlay position="bottom" @close="onClose">
      <van-picker :columns="realOptions" @cancel="onCancel" @confirm="onConfirm"/>
    </van-popup>
  </div>
</template>

<style scoped lang="less">

</style>