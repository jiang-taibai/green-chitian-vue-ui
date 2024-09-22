<script setup>

import UserTabBar from "@/components/user/UserTabBar.vue";
</script>

<template>
  <div>
    <router-view/>
    <user-tab-bar active="record"/>
  </div>
</template>

<style scoped>

</style>