<script setup>

import UserTabBar from "@/components/user/UserTabBar.vue";
</script>

<template>
  <div>
    <router-view/>
<!--    <p>导航 ：-->
<!--      <router-link to="/user/record/home">首页</router-link>-->
<!--      |-->
<!--      <router-link to="/user/record/detail">-详细</router-link>-->
<!--      |-->
<!--      <router-link to="/user/record/upload">-上传</router-link>-->
<!--    </p>-->
    <user-tab-bar active="record"/>
  </div>
</template>

<style scoped>

</style>