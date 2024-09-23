<script setup>

import NavBar from "@/components/public/NavBar.vue";
import SmsField from "@/components/public/SMSField.vue";
import {ref} from "vue";

const formData = ref({
  account: '',
  sms: '',
  password: '',
  confirmPassword: ''
})
</script>

<template>
  <div>
    <nav-bar title="修改密码" back/>
    <div class="container">
      <div class="form">
        <div class="input">
          <van-field v-model="formData.account" label="手机号" placeholder="请输入手机号"/>
          <sms-field :account="formData.account" v-model="formData.sms"/>
          <van-field v-model="formData.password"
                     label="密码" placeholder="请输入密码" type="password"/>
          <van-field v-model="formData.confirmPassword"
                     label="确认密码" placeholder="请再次输入密码" type="password"/>
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