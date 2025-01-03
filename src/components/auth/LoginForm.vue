<script setup>
import {ref, defineEmits} from 'vue'
import SmsField from "@/components/public/SMSField.vue";
import {login} from "@/assets/js/api/api-auth.js";
import {showFailToast} from '@/assets/js/plugins/vant-toast.js';
import {useUserStore} from "@/assets/js/store/user-info.js";
import {isSuccessResponse} from "@/assets/js/api/response-utils.js";
import {WxMiniProgramUtils} from "@/assets/js/plugins/weixing-js-sdk.js";
import {SYSTEM_CONFIG} from "@/assets/js/public/system.js";
import {getAuthorizeURL} from "@/assets/js/api/api-weixin.js";
import {useRouter} from "vue-router";
import {resolveAbsoluteURL} from "@/assets/js/public/utils.js";

const emits = defineEmits(['login', 'change-to-register', 'change-to-forget']);
const userStore = useUserStore();
const router = useRouter();

const formData = ref({
  authType: 'password',
  account: 'admin',
  sms: '',
  password: 'admin'
})

const onChangeAuthType = () => {
  formData.value.authType = formData.value.authType === 'sms' ? 'password' : 'sms';
}
const onChangeToForget = () => {
  emits('change-to-forget');
}
const onChangeToRegister = () => {
  emits('change-to-register');
}

const onPasswordLogin = () => {
  login({
    username: formData.value.account,
    password: formData.value.password,
  }).then(res => {
    if (isSuccessResponse(res)) {
      userStore.setToken(res.data);
      emits('login');
    } else {
      showFailToast(res.message);
    }
  }).catch(err => {
    showFailToast(err.message);
  });
}

const onSMSLogin = () => {
  if (!SYSTEM_CONFIG.SMS_LOGIN_ENABLED) {
    showFailToast('暂不支持短信登录');
  }
}

const onLogin = () => {
  if (formData.value.authType === 'sms') {
    onSMSLogin();
  } else {
    onPasswordLogin();
  }
}

const onWechatLogin = () => {
  if (WxMiniProgramUtils.isWeChatEnv()) {
    // WxMiniProgramUtils.reLaunch({url: '/pages/index/index'})
    const redirectUri = resolveAbsoluteURL({name: 'Auth'})
    getAuthorizeURL({
      redirectUri,
      scope: 'snsapi_userinfo',
      state: 'wxlogin'
    }).then(url => {
      window.location.href = url;
    }).catch(err => {
      showFailToast(err.message);
    });
  } else {
    showFailToast('请在微信小程序中使用');
  }
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
        <van-field v-model="formData.account" label="手机号" placeholder="请输入手机号"/>
        <sms-field v-show="formData.authType==='sms'" :account="formData.account" v-model="formData.sms"/>
        <van-field v-show="formData.authType==='password'" v-model="formData.password"
                   label="密码" placeholder="请输入密码" type="password"/>
        <van-field v-show="false" placeholder="用来生成密码的横线，请勿删除"/>
        <div class="action">
          <div class="left" @click="onChangeAuthType">
            {{ formData.authType === 'sms' ? '使用密码登录' : '使用短信登录' }}
          </div>
          <div class="right" @click="onChangeToForget">
            忘记密码？
          </div>
        </div>
      </div>
      <div class="buttons">
        <van-button type="primary" round block @click="onLogin">登陆</van-button>
        <van-button type="success" round block @click="onWechatLogin">微信快捷登录</van-button>
        <van-button type="default" round block @click="onChangeToRegister">前往注册</van-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
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