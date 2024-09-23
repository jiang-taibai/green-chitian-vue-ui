<script setup>
import {computed, ref} from "vue";
import UserTabBar from "@/components/user/UserTabBar.vue";
import GeoLocationFiled from "@/components/public/GeoLocationFiled.vue";
import TMap from "@/components/public/TMap.vue";
import NavBar from "@/components/public/NavBar.vue";

const location = ref({
  text: "未知位置",
  latitude: 39.924232,
  longitude: 116.403406,
})

const coordinate = computed(() => {
  return {
    latitude: location.value.latitude,
    longitude: location.value.longitude,
  }
})

const coordinateText = computed(() => {
  return `(${location.value.latitude}, ${location.value.longitude})`
})
const soilNutrients = ref([
  {name: "坐标", value: coordinateText},
  {name: "氮", value: "0.1g/kg"},
  {name: "磷", value: "0.2g/kg"},
  {name: "钾", value: "0.3g/kg"},
  {name: "有机质", value: "0.4g/kg"},
  {name: "PH", value: "5.6"},
  {name: "水分", value: "20%"},
  {name: "温度", value: "20℃"},
])
</script>

<template>
  <div>
    <nav-bar title="土壤养分"/>
    <div class="container">
      <div class="location">
        <geo-location-filed class="location-filed" v-model:location="location"/>
        <t-map :coordinate="coordinate"/>
      </div>
      <van-cell-group style="margin: 0" title="所在区域土壤养分" inset>
        <van-cell v-for="item in soilNutrients" :key="item.name" :title="item.name" :value="item.value"/>
      </van-cell-group>
    </div>
    <user-tab-bar active="farmland-data"/>
  </div>
</template>

<style scoped lang="less">
.container {
  padding: 16px;
}

.location {
  padding: 16px;
  border-radius: 8px;
  background-color: #fff;

  .location-filed {
    font-size: var(--van-cell-font-size);
    padding: 0 10px 10px;
  }
}
</style>