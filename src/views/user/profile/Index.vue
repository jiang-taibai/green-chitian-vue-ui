<script setup>

import NavBar from "@/components/public/NavBar.vue";
</script>

<template>
  <div>
    <nav-bar title="我的"/>
    <div class="container">
      <div class="navigator">
        <van-cell title="手机号换绑" is-link clickable :to="{name: 'ProfileModifyPhone'}"/>
        <van-cell title="修改密码" is-link clickable :to="{name: 'ProfileModifyPassword'}"/>
      </div>
      <van-button type="danger" size="small" block round>退出登录</van-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.navigator {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
}
</style>