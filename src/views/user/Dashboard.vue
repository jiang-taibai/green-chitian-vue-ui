<script setup>

import UserTabBar from "@/components/user/UserTabBar.vue";
import DashboardTotalAgrochemicalStatistics from "@/components/user/dashboard/DashboardTotalAgrochemicalStatistics.vue";
import DashboardVariousAgrochemicalStatistics
  from "@/components/user/dashboard/DashboardVariousAgrochemicalStatistics.vue";
import QuickBox from "@/components/user/dashboard/QuickBox.vue";
import NavBar from "@/components/public/NavBar.vue";
</script>

<template>
  <div>
    <nav-bar title="绿色赤田"/>
    <div class="container">
      <div class="toolbox-container">
        <div class="cart-item">
          <div class="title">
            <van-icon class="title-icon" name="shortcut" class-prefix="iconfont" size="18" color="#EE0A24"/>
            <span class="title-text">快捷入口</span>
          </div>
        </div>
        <div class="content">
          <quick-box/>
        </div>
      </div>
      <div class="chart-container">
        <div class="cart-item">
          <div class="title">
            <van-icon class="title-icon" name="chart" class-prefix="iconfont" size="18" color="#1989FA"/>
            <span class="title-text">总化肥农药统计</span>
          </div>
          <div class="content">
            <dashboard-total-agrochemical-statistics/>
          </div>
        </div>
        <div class="cart-item">
          <div class="title">
            <van-icon class="title-icon" name="chart" class-prefix="iconfont" size="18" color="#1989FA"/>
            <span class="title-text">各化肥农药统计</span>
          </div>
          <div class="content">
            <dashboard-various-agrochemical-statistics/>
          </div>
        </div>
      </div>
      <user-tab-bar active="dashboard"/>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  min-height: 100vh;
  padding: 16px;
  background: #F2F2F2;

  .toolbox-container {
    margin-bottom: 16px;
  }
}

.cart-item {
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
      margin-bottom: 16px;
    }
  }
}
</style>