<script setup>
import {ref, defineProps, watch, computed, onMounted} from "vue";
import pointImage from "@/assets/img/icon/point.png";
import {tencentMapDeveloperKey} from "@/assets/js/secret";
import failToLocate from "@/assets/img/illustration/fail-to-locate.svg";

const props = defineProps({
  coordinate: {
    type: Object,
    default: () => ({latitude: 0.0, longitude: 0.0})
  },
});

const localCoordinate = ref(props.coordinate);

watch(() => props.coordinate, (val) => {
  localCoordinate.value = {
    latitude: val.latitude,
    longitude: val.longitude,
  };
}, {deep: true});

const center = computed(() => {
  return {lat: localCoordinate.value.latitude, lng: localCoordinate.value.longitude};
})
const zoom = 14;
const doubleClickZoom = true;
const control = {
  scale: {},
}
const baseMap = {
  type: "satellite",
  features: ["base", "road"],
}
const markerGeometries = computed(() => {
  return [{
    id: 'point',
    styleId: 'point',
    position: {lat: localCoordinate.value.latitude, lng: localCoordinate.value.longitude},
  }]
})
const markerStyles = {
  point: {
    width: 25,
    height: 25,
    anchor: {x: 16, y: 32},
    src: pointImage,
  },
}
const isValidCoordinate = computed(() => {
  return localCoordinate.value.latitude !== 0.0 && localCoordinate.value.longitude !== 0.0;
})

const coordinateErrorCanvas = ref(null);
const drawCoordinateErrorCanvas = () => {
  const canvas = coordinateErrorCanvas.value;
  if (!canvas) return;
  const padding = 20;
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.src = failToLocate;
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const drawX = padding;
    const drawY = padding;
    const drawWidth = canvas.width - 2 * padding;
    const drawHeight = canvas.height - 2 * padding;
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // 黑色，50% 透明度
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const text = "定位错误";
    const fontSize = Math.min(drawWidth, drawHeight) / 10; // 动态字体大小
    ctx.font = `${fontSize}px sans-serif`; // 字体大小和字体，可以根据需要调整
    ctx.fillStyle = "white"; // 文本颜色
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    ctx.fillText(text, x, y);
  };

  img.onerror = () => {
    console.error("Failed to load image:", failToLocate);
  };
};
onMounted(() => {
  drawCoordinateErrorCanvas();
})
</script>

<template>
  <tmap-map v-show="isValidCoordinate" :mapKey="tencentMapDeveloperKey" :baseMap="baseMap"
            :center="center" :zoom="zoom" :doubleClickZoom="doubleClickZoom" :control="control">
    <tmap-multi-marker :styles="markerStyles" :geometries="markerGeometries"/>
  </tmap-map>
  <canvas v-show="!isValidCoordinate" ref="coordinateErrorCanvas"
          style="width: 100%; height: 100%; z-index: 2;" width="750" height="376"></canvas>
</template>

<style scoped>

</style>