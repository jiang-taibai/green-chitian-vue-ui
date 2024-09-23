<script setup>

import NavBar from "@/components/public/NavBar.vue";
import SmsField from "@/components/public/SMSField.vue";
import {ref} from "vue";

const formData = ref({
  newAccount: '',
  sms: '',
  password: '',
  confirmPassword: ''
})
</script>

<template>
  <div>
    <nav-bar title="换绑手机号" back/>
    <div class="container">
      <div class="form">
        <div class="input">
          <van-field v-model="formData.newAccount" label="新手机号" placeholder="请输入手机号"/>
          <sms-field :account="formData.newAccount" v-model="formData.sms"/>
        </div>
      </div>
      <van-button type="primary" size="small" block round>确认修改</van-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.form {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
}
</style>