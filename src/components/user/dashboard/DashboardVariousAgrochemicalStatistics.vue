<script setup>
import {ref, onMounted, nextTick} from "vue";
import * as echarts from 'echarts';
import {
  getFertilizerPesticideProportionPieChartData,
} from "@/assets/js/api/api-dashboard.js";
import {isSuccessResponse} from "@/assets/js/api/response-utils.js";
import {showFailToast} from "@/assets/js/plugins/vant-toast.js";

const chart = ref(null);
let fertilizerPesticideData = [];

const renderChart = (chartDom, data) => {
  const eChartInstance = echarts.init(chartDom);
  const option = {
    tooltip: {
      trigger: 'item'
    },
    grid: {
      top: 0,
      bottom: 0,
    },
    series: [{
      name: '各化肥农药使用量统计',
      type: 'pie',
      radius: '50%',
      data: data,
    }]
  };
  eChartInstance.setOption(option);
}

/**
 * 获取数据
 */
const fetchData = async () => {
  const fertilizerPesticideDataResponse = await getFertilizerPesticideProportionPieChartData()
  if (isSuccessResponse(fertilizerPesticideDataResponse)) {
    fertilizerPesticideData = fertilizerPesticideDataResponse.data;
  } else {
    return Promise.reject(new Error(fertilizerPesticideDataResponse.message));
  }
  return Promise.resolve()
}

onMounted(async () => {
  await fetchData().catch((error) => {
    showFailToast(error.message);
  });
  await nextTick(() => {
    renderChart(chart.value, fertilizerPesticideData);
  });
});
</script>

<template>
  <div>
    <div class="container">
      <div class="chart-container">
        <div ref="chart" class="chart"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  padding: 10px;
  border-radius: 8px;
  background-color: #fff;
}

.chart-container {
  padding: 10px;

  .chart {
    height: 30vh;
  }
}
</style>