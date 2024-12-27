<script setup>
import {ref, onMounted} from 'vue'
import {showSuccessToast} from '@/assets/js/plugins/vant-toast.js';
import LoginForm from "@/components/auth/LoginForm.vue";
import RegisterForm from "@/components/auth/RegisterForm.vue";
import ForgetForm from "@/components/auth/ForgetForm.vue";
import {useRouter} from 'vue-router';
import {wxLogin} from "@/assets/js/api/api-auth.js";
import {isSuccessResponse} from "@/assets/js/api/response-utils.js";
import {useUserStore} from "@/assets/js/store/user-info.js";
import {showFailToast} from "vant";
import {WxMiniProgramUtils} from "@/assets/js/plugins/weixing-js-sdk.js";

const router = useRouter();
const userStore = useUserStore();
const tab = ref('login');
const onLogin = () => {
  showSuccessToast('登陆成功');
  router.push({name: 'UserDashboard'});
}

// 获取当前 URL 的查询参数，排除 hash 部分
const getQueryParams = () => {
  // 使用 URLSearchParams 解析查询参数部分
  const urlParams = new URLSearchParams(window.location.search);
  // 创建一个对象来存储所有的查询参数
  const params = {};
  // 遍历 URL 参数并存入对象
  urlParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

/**
 * 尝试使用微信登录
 * 触发条件：
 */
const tryLoginIfByWechat = () => {
  const parsedParams = getQueryParams();
  const type = parsedParams.type;
  const code = parsedParams.code;
  if (type !== 'wx-login') {
    return
  }
  wxLogin(code).then(/** @param res {Result<WXLoginResponseData>} */res => {
    if (isSuccessResponse(res)) {
      userStore.setToken(res.data.jwt);
      userStore.setNeedBindPhone(res.data.needBind)
      showSuccessToast('登陆成功');
      WxMiniProgramUtils.reLaunch({url: '/pages/index/index?type=normal-login&auth=success'})
    } else {
      showFailToast(res.message);
      WxMiniProgramUtils.reLaunch({url: '/pages/index/index?type=normal-login&auth=fail'})
    }
  }).catch(err => {
    showFailToast(err.message);
    WxMiniProgramUtils.reLaunch({url: '/pages/index/index?type=normal-login&auth=fail'})
  });
}

/**
 * 尝试自动登录
 * 触发条件：
 */
const tryAutoLogin = () => {
  const parsedParams = getQueryParams();
  const type = parsedParams.type;
  if (type !== 'normal-login') {
    return
  }
  const autoLogin = parsedParams['auto-login'];
  if (autoLogin === 'true' && userStore.isAuthenticated) {
    showSuccessToast('登陆成功');
    router.push({name: 'UserDashboard'});
  }
}

/**
 * 注意：以下所述的【进入页面】，都会触发 onMounted 生命周期
 * 1. 小程序首先不带参数进入登录页面，此时不执行任何操作
 * 2. 小程序询问用户是否授权登录
 * 2.1 用户点击确认后，小程序带上 {type: 'wx-login', code: *} 参数进入登录页面，此时执行微信登录 tryLoginIfByWechat
 * 2.1.1 如果H5登录成功，则将小程序重定向到登录页，带上参数 {type: 'wx-login', auth: 'success'}，小程序将跳至第 3B 步
 * 2.1.2 如果H5登录失败，则将小程序重定向到登录页，带上参数 {type: 'wx-login', auth: 'fail'}，小程序将跳至第 3A 步
 * 2.2 用户点击取消后，跳至第 3A 步
 * 3A. 小程序带上 {type: 'normal-login', auto-login: false} 参数进入登录页面，此时执行微信登录 tryAutoLogin
 * 3B. 小程序将 H5 带上参数 {type: 'normal-login', auto-login: true} 进入登录页面，此时执行自动登录 tryAutoLogin
 */
onMounted(() => {
  tryAutoLogin();
  tryLoginIfByWechat();
})
</script>

<template>
  <div class="container">
    <div class="cover">
      <span>绿色赤田</span>
    </div>
    <div class="main">
      <login-form v-if="tab==='login'" @change-to-register="tab='register'" @change-to-forget="tab='forget'"
                  @login="onLogin"/>
      <register-form v-else-if="tab==='register'" @change-to-login="tab='login'"/>
      <forget-form v-else @change-to-login="tab='login'"/>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
}

.cover {
  position: relative;
  height: 30vh;
  background-image: url("@/assets/img/cover/farmland-02.jpg");
  background-size: cover;
  background-position: center;

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 36px;
    font-weight: bold;
  }
}

.cover::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2); /* 半透明黑色蒙版 */
}

.main {
  flex: 1;
  display: flex;
  background-color: #fff; /* main 区域的背景颜色 */
  border-top-left-radius: 30px; /* 调整圆角大小 */
  border-top-right-radius: 30px;
  margin-top: -30px;
  padding: 30px 20px;
  z-index: 1;
  position: relative;
}
</style>