<script setup>
import {defineProps, defineEmits, onMounted, ref} from 'vue';
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
const options = ref([])

/* =============== 方法 ================== */
const onConfirm = ({selectedOptions}) => {
  emit('update:show', false);
  emit('confirm', {selectedOptions});
}
const onCancel = () => {
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
      const farmlandList = [];
      res.data.forEach(/** @param item {Field} */item => {
        farmlandList.push({
          text: `${item.committee}-${item.fieldClass} #${item.id}`,
          value: item.id
        });
      });
      options.value = farmlandList;
    }
  });
}
</script>

<template>
  <div>
    <van-popup v-model:show="props.show" round position="bottom">
      <van-picker :columns="options" @cancel="onCancel" @confirm="onConfirm"/>
    </van-popup>
  </div>
</template>

<style scoped lang="less">

</style>