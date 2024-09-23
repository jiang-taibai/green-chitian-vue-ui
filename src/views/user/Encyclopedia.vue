<script setup>

import UserTabBar from "@/components/user/UserTabBar.vue";
</script>

<template>
  <div>
    <van-nav-bar title="百科指南" fixed placeholder/>

    <user-tab-bar active="encyclopedia"/>
  </div>
</template>

<style scoped lang="less">

</style>