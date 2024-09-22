<script setup>

import UserTabBar from "@/components/user/UserTabBar.vue";
import DashboardStatistics from "@/components/user/dashboard/DashboardTotalAgrochemicalStatistics.vue";
</script>

<template>
  <div class="container">
    <div class="chart-container">
      <div class="chart-item">
        <div class="title">
          <van-icon class="title-icon" name="chart" class-prefix="iconfont" size="18"/>
          <span class="title-text">总化肥农药统计</span>
        </div>
        <div class="content">
          <dashboard-statistics/>
        </div>
      </div>
      <div class="chart-item">
        <div class="title">
          <van-icon class="title-icon" name="chart" class-prefix="iconfont" size="18"/>
          <span class="title-text">各化肥农药统计</span>
        </div>
        <div class="content"></div>
      </div>
    </div>
    <user-tab-bar active="dashboard"/>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  padding: 16px;
  background: #F2F2F2;
}

.chart-item {
  margin-bottom: 16px;
  border-radius: 8px;

  .title {
    padding-left: 8px;
    margin-bottom: 8px;

    .title-icon {
      margin-right: 8px;
    }

    .title-text {
      font-size: large;
      font-weight: bold;
      margin-bottom: 16px;
    }
  }
}
</style>