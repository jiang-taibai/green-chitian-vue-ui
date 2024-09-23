<script setup>

import UserTabBar from "@/components/user/UserTabBar.vue";
</script>

<template>
  <div>
    <router-view/>
    <user-tab-bar active="encyclopedia"/>
  </div>
</template>

<style scoped lang="less">

</style>