<script setup>
import {ref, defineEmits} from 'vue'
import SmsField from "@/components/public/SMSField.vue";
import {SYSTEM_CONFIG} from "@/assets/js/public/system.js";
import {showFailToast} from "@/assets/js/plugins/vant-toast.js";

const emits = defineEmits(['register', 'change-to-login'])

const formData = ref({
  authType: 'sms',
  account: '',
  sms: '',
  password: '',
  confirmPassword:''
})
const sendingState = ref({
  sent: false,
  enable: true,
  count: 0
})

const sendingConfig = {
  intervalSeconds: 60,
}

const onChangeToLogin = () => {
  emits('change-to-login');
}
const onRegister = () => {
  if(!SYSTEM_CONFIG.REGISTRATION_ENABLED) {
    showFailToast('注册功能未开启');
    return;
  }
  // 先简单的触发事件，后续再补充登录逻辑
  emits('register', {...formData.value});
}
</script>

<template>
  <div class="container">
    <div class="hello">
      <span class="title">注册</span>
      <span class="info">欢迎使用绿色赤田</span>
    </div>
    <div class="form">
      <div class="input">
        <van-field v-model="formData.account" label="手机号" placeholder="请输入手机号"/>
        <sms-field :account="formData.account" v-model="formData.sms"/>
        <van-field  v-model="formData.password"
                   label="密码" placeholder="请输入密码" type="password"/>
        <van-field  v-model="formData.confirmPassword"
                   label="确认密码" placeholder="请再次输入密码" type="password"/>
      </div>
      <div class="buttons">
        <van-button type="primary" round block @click="onRegister">注册</van-button>
        <van-button type="default" round block @click="onChangeToLogin">前往登录</van-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  //空间占满跟这个有什么关系吗
  flex: 1
}

.hello {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .info {
    font-size: 14px;
    color: #666;
  }
}
.form {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.action {
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  margin-top: 10px;
  font-size: small;

  .left {
    color: #1989fa;
  }

  .right {
    color: #1989fa;
  }
}
.buttons {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>