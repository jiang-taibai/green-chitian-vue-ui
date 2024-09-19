<script setup>
import {ref, defineEmits} from 'vue'

const emits = defineEmits(['login', 'change-to-register', 'change-to-forget']);

const authType = ref('sms');
const account = ref('');
const sms = ref('');
const password = ref('');

const onChangeAuthType = () => {
  authType.value = authType.value === 'sms' ? 'password' : 'sms';
}
const onChangeToForget = () => {
  emits('change-to-forget');
}
const onChangeToRegister = () => {
  emits('change-to-register');
}
const login = () => {
  // 先简单的触发事件，后续再补充登录逻辑
  emits('login', {account: account.value, sms: sms.value, password: password.value});
}
</script>

<template>
  <div class="container">
    <div class="hello">
      <span class="title">登录</span>
      <span class="info">欢迎使用绿色赤田</span>
    </div>
    <div class="form">
      <div class="input">
        <van-field v-model="account" label="手机号" placeholder="请输入手机号"/>
        <van-field v-show="authType==='sms'" v-model="sms" clearable label="验证码"
                   placeholder="请输入短信验证码">
          <template #button>
            <div>发送验证码</div>
          </template>
        </van-field>
        <van-field v-show="authType==='password'" v-model="password"
                   label="密码" placeholder="请输入密码" type="password"/>
        <van-field v-show="false" placeholder="用来生成密码的横线，请勿删除"/>
        <div class="action">
          <div class="left" @click="onChangeAuthType">
            {{ authType === 'sms' ? '使用密码登录' : '使用短信登录' }}
          </div>
          <div class="right" @click="onChangeToForget">
            忘记密码？
          </div>
        </div>
      </div>
      <div class="buttons">
        <van-button type="primary" round block @click="login">登陆</van-button>
        <van-button type="default" round block @click="onChangeToRegister">前往注册</van-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
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