<script setup>

import {ref, defineProps, defineEmits, watch} from "vue";
import {SYSTEM_CONFIG} from "@/assets/js/public/system.js";
import {showFailToast} from "@/assets/js/plugins/vant-toast.js";

const props = defineProps({
  account: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])
const localAccount = ref(props.account)
const localModelValue = ref(props.modelValue)
watch(() => props.account, (newVal) => {
  localAccount.value = newVal
})
watch(() => props.modelValue, (newVal) => {
  localModelValue.value = newVal
})

const sendingState = ref({
  sent: false,
  enable: true,
  count: 0
})

const sendingConfig = {
  intervalSeconds: 60,
}
const onSendSms = () => {
  if (!SYSTEM_CONFIG.SMS_ENABLED) {
    showFailToast('短信功能未开启');
    return;
  }
  sendingState.value.sent = true;
  sendingState.value.enable = false;
  sendingState.value.count = sendingConfig.intervalSeconds;
  const timer = setInterval(() => {
    sendingState.value.count--;
    if (sendingState.value.count <= 0) {
      sendingState.value.enable = true;
      clearInterval(timer);
    }
  }, 1000);
}

const onUpdateModelValue = (value) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <van-field v-model="localModelValue" clearable label="验证码"
             @update:model-value="onUpdateModelValue"
             placeholder="请输入短信验证码">
    <template #button>
      <div style="color: #1989fa" v-if="sendingState.enable" @click="onSendSms">
        <span>{{ sendingState.sent ? '重新发送' : '发送验证码' }}</span>
      </div>
      <div v-else>{{ sendingState.count }}s</div>
    </template>
  </van-field>
</template>

<style scoped lang="less">

</style>