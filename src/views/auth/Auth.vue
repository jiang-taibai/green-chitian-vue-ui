<script setup>
import {ref} from 'vue'
import {showSuccessToast} from 'vant';
import LoginForm from "@/components/auth/LoginForm.vue";
import RegisterForm from "@/components/auth/RegisterForm.vue";
import ForgetForm from "@/components/auth/ForgetForm.vue";
import {useRouter} from 'vue-router';

const router = useRouter();
const tab = ref('login');
const onLogin = (data) => {
  showSuccessToast('登陆成功');
  router.push('/user/dashboard');
}
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