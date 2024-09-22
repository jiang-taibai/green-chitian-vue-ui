<script setup>
import {ref, onMounted, nextTick} from "vue";
import * as echarts from 'echarts';

const activatedTab = ref('monthly')

import {getRandomIntNumber} from "@/assets/js/public/utils.js";

const monthlyChart = ref(null);
const quarterlyChart = ref(null);
const annualChart = ref(null);
const renderedCharts = {
  monthly: false,
  quarterly: false,
  annual: false,
}

const frequencyData = {};
const dosageData = {}

for (let year = 2022; year <= 2024; year++) {
  for (let month = 1; month <= 12; month++) {
    if (year === 2024 && month >= 10) break;
    const randomFrequencyValue = getRandomIntNumber(10, 50);
    const randomDosageValue = getRandomIntNumber(randomFrequencyValue * 10, randomFrequencyValue * 20);
    const dateStr = `${year}-${month.toString().padStart(2, '0')}`;
    frequencyData[dateStr] = {
      year: year,
      month: month,
      value: randomFrequencyValue,
    };
    dosageData[dateStr] = {
      year: year,
      month: month,
      value: randomDosageValue,
    }
  }
}

const renderMonthlyChart = () => {
  if (renderedCharts.monthly) return;
  renderedCharts.monthly = true;
  const frequencySeriesData = []
  const dosageSeriesData = []
  const keys = Object.keys(frequencyData).sort();
  for (const key of keys) {
    const frequencyDataItem = frequencyData[key];
    const dosageDataItem = dosageData[key];
    frequencySeriesData.push(frequencyDataItem.value)
    dosageSeriesData.push(dosageDataItem.value)
  }
  initChart(monthlyChart.value, keys, frequencySeriesData, dosageSeriesData);
}

const renderQuarterlyChart = () => {
  if (renderedCharts.quarterly) return;
  renderedCharts.quarterly = true;
  const quarterlyData = {};
  const dataKeys = Object.keys(frequencyData).sort();
  for (const key of dataKeys) {
    const frequencyDataItem = frequencyData[key];
    const dosageDataItem = dosageData[key];
    const quarterStr = `${frequencyDataItem.year}-Q${Math.ceil(frequencyDataItem.month / 3)}`;
    if (!quarterlyData[quarterStr]) {
      quarterlyData[quarterStr] = {
        quarterStr: quarterStr,
        value: {
          frequency: 0,
          dosage: 0,
        }
      }
    }
    quarterlyData[quarterStr].value.frequency += frequencyDataItem.value;
    quarterlyData[quarterStr].value.dosage += dosageDataItem.value;
  }
  const frequencySeriesData = []
  const dosageSeriesData = []
  const quarterlyDataKeys = Object.keys(quarterlyData).sort();
  for (const key of quarterlyDataKeys) {
    const quarterlyDataItem = quarterlyData[key];
    frequencySeriesData.push(quarterlyDataItem.value.frequency)
    dosageSeriesData.push(quarterlyDataItem.value.dosage)
  }
  initChart(quarterlyChart.value, quarterlyDataKeys, frequencySeriesData, dosageSeriesData);
}

const renderAnnualChart = () => {
  if (renderedCharts.annual) return;
  renderedCharts.annual = true;
  const annualData = {};
  const dataKeys = Object.keys(frequencyData).sort();
  for (const key of dataKeys) {
    const frequencyDataItem = frequencyData[key];
    const dosageDataItem = dosageData[key];
    const yearStr = frequencyDataItem.year;
    if (!annualData[yearStr]) {
      annualData[yearStr] = {
        yearStr: yearStr,
        value: {
          frequency: 0,
          dosage: 0,
        }
      }
    }
    annualData[yearStr].value.frequency += frequencyDataItem.value;
    annualData[yearStr].value.dosage += dosageDataItem.value;
  }
  const frequencySeriesData = []
  const dosageSeriesData = []
  const annualDataKeys = Object.keys(annualData).sort();
  for (const key of annualDataKeys) {
    const annualDataItem = annualData[key];
    frequencySeriesData.push(annualDataItem.value.frequency)
    dosageSeriesData.push(annualDataItem.value.dosage)
  }
  initChart(annualChart.value, annualDataKeys, frequencySeriesData, dosageSeriesData);
}

const initChart = (chartDom, xAxisData, frequencySeriesData, dosageSeriesData) => {
  const series = [{
    name: '频次',
    type: 'bar',
    barGap: 0,
    emphasis: {
      focus: 'series'
    },
    data: frequencySeriesData,
  }, {
    name: '用量',
    type: 'bar',
    barGap: 0,
    emphasis: {
      focus: 'series'
    },
    data: dosageSeriesData,
  },]
  const eChartInstance = echarts.init(chartDom);
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['频次', '用量'],
      left: 'left',
    },
    grid: [{
      top: 30,
      bottom: 30,
    }],
    toolbox: {
      show: true,
      orient: 'horizontal',
      left: 'right',
      top: 'top',
      feature: {
        mark: {show: true},
        dataView: {show: true, readOnly: false},
        magicType: {show: true, type: ['line', 'bar', 'stack']},
        restore: {show: true},
        saveAsImage: {show: true}
      }
    },
    xAxis: [{
      type: 'category',
      axisTick: {show: false},
      data: xAxisData,
    }],
    yAxis: [{
      type: 'value'
    }],
    series: series,
  };
  eChartInstance.setOption(option);
}

onMounted(() => {
  nextTick(() => {
    renderMonthlyChart();
  });
})

const handleTabChange = (name) => {
  nextTick(() => {
    switch (name) {
      case 'monthly':
        renderMonthlyChart();
        break;
      case 'quarterly':
        renderQuarterlyChart();
        break;
      case 'annual':
        renderAnnualChart();
        break;
    }
  });
}
</script>

<template>
  <div>
    <div class="tab-container">
      <van-tabs v-model:active="activatedTab" @change="handleTabChange">
        <van-tab title="月度" name="monthly">
          <div class="chart-container">
            <div ref="monthlyChart" class="chart"></div>
          </div>
        </van-tab>
        <van-tab title="季度" name="quarterly">
          <div class="chart-container">
            <div ref="quarterlyChart" class="chart"></div>
          </div>
        </van-tab>
        <van-tab title="年度" name="annual">
          <div class="chart-container">
            <div ref="annualChart" class="chart"></div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<style scoped lang="less">
.tab-container {
  padding: 10px;
  border-radius: 8px;
  background-color: #fff;
}

.chart-container {
  padding: 10px;
}

.chart {
  height: 40vh;
}
</style>