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
    <van-search v-model="searchKeyword" show-action placeholder="请输入搜索关键词" @search="onSearch">
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <div class="container">
      <div class="card">
        <p>原功能需求不明确，待开发</p>
        <p>功能需求：</p>
        <p>1. 查询功能，能够查询推荐施肥量、病虫害绿色防控技术模式等</p>
        <p>2. 后台管理员能够更新推荐施肥量、病虫害绿色防控技术模式这些信息</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  padding: 16px;
}
.card {
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;

  p {
    margin: 8px 0;
  }
}
</style>