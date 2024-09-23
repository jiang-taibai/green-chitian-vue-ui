<script setup>
import {ref} from 'vue';
import NavBar from "@/components/public/NavBar.vue";

const searchKeyword = ref('');

const onSearch = (value) => {
  console.log(value);
};
</script>

<template>
  <div>
    <nav-bar title="百科指南"/>
    <van-search v-model="searchKeyword" show-action placeholder="请输入搜索关键词" @search="onSearch" >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
  </div>
</template>

<style scoped lang="less">

</style>