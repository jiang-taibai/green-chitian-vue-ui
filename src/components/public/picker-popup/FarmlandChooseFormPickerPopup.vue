<script setup>
import {defineProps, defineEmits, onMounted, ref, watch} from 'vue';
import {userFields} from "@/assets/js/api/api-record.js";
import {isSuccessResponse} from "@/assets/js/api/response-utils.js";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:show', 'confirm']);

/* =============== 数据 ================== */
const localShow = ref(props.show)
const options = ref([])

/* =============== 父子组件传值监听 ================== */
watch(() => props.show, (newValue) => {
  localShow.value = newValue
})
watch(() => localShow.value, (newValue) => {
  emit('update:show', newValue)
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
  initFarmlands();
}
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
          text: `${item.committee}-${item.fieldClass} #${item.id}`,
          value: item.id,
          originalData: item,
        });
      });
      options.value = farmlandList;
    }
  });
}
</script>

<template>
  <div>
    <van-popup v-model:show="localShow" round close-on-click-overlay position="bottom" @close="onClose">
      <van-picker :columns="options" @cancel="onCancel" @confirm="onConfirm"/>
    </van-popup>
  </div>
</template>

<style scoped lang="less">

</style>