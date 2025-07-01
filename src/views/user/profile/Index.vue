<script setup>
import {useRouter} from "vue-router";
import NavBar from "@/components/public/NavBar.vue";
import {useUserStore} from "@/assets/js/store/user-info.js";

const router = useRouter();
const userStore = useUserStore();

const onLogOut = () => {
  userStore.clearUser();
  router.push({name: 'Auth'});
};
</script>

<template>
  <div style="display: flex; flex-direction: column; height: 100%;">
    <nav-bar title="我的"/>
    <div class="container">
      <div class="navigator">
        <van-cell title="手机号换绑" is-link clickable :to="{name: 'ProfileModifyPhone'}"/>
        <van-cell title="修改密码" is-link clickable :to="{name: 'ProfileModifyPassword'}"/>
      </div>
      <div class="button">
        <van-button type="danger" size="small" block round @click="onLogOut">退出登录</van-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
  justify-content: space-between;
}

.navigator {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  overflow: hidden;
}

.button {
  margin-bottom: 50px;
}
</style>