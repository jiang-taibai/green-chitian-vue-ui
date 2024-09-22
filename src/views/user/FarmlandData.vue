<script setup>

import UserTabBar from "@/components/user/UserTabBar.vue";
</script>

<template>
  <div>
    <router-view/>
    <user-tab-bar active="farmland-data"/>
  </div>
</template>

<style scoped>

</style>