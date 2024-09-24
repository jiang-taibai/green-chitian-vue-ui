<script setup>

import UserTabBar from "@/components/user/UserTabBar.vue";
</script>

<template>
  <div>
    <router-view/>
    <user-tab-bar active="profile" :placeholder="false"/>
  </div>
</template>

<style scoped>

</style>