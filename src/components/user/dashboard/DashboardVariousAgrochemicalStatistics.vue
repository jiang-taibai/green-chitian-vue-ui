<script setup>
import {ref, onMounted, nextTick} from "vue";
import * as echarts from 'echarts';

const chart = ref(null);
const fertilizerPesticideData = [
  {value: 1048.00, name: '尿素'},        // Urea
  {value: 735.50, name: '磷肥'},        // Phosphate Fertilizer
  {value: 580.25, name: '钾肥'},        // Potassium Fertilizer
  {value: 484.75, name: '杀虫剂'},      // Insecticide
  {value: 300.10, name: '除草剂'},      // Herbicide
  {value: 250.55, name: '杀菌剂'},      // Fungicide
  {value: 200.00, name: '有机肥'},      // Organic Fertilizer
  {value: 150.30, name: '生长调节剂'},  // Growth Regulator
  {value: 100.80, name: '微量元素肥料'},// Micronutrient Fertilizer
  {value: 80.99, name: '缓释肥料'}      // Controlled-Release Fertilizer
];

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

onMounted(() => {
  nextTick(() => {
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