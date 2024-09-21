<script setup>
import {ref, defineProps} from "vue";
import pointImage from "@/assets/img/icon/point.png";
import {tencentMapDeveloperKey} from "@/assets/js/public/tmap.js";

const props = defineProps({
  coordinate: {
    type: Object,
    default: () => ({latitude: 0.0, longitude: 0.0})
  },
});

const center = ref({lat: props.coordinate.latitude, lng: props.coordinate.longitude});
const zoom = ref(14);
const doubleClickZoom = ref(true);
const control = {
  scale: {},
}
const baseMap = {
  type: "satellite",
  features: ["base", "road"],
}
const markerGeometries = [
  {
    id: 'point',
    styleId: 'point',
    position: {lat: props.coordinate.latitude, lng: props.coordinate.longitude},
  }
];
const markerStyles = {
  point: {
    width: 25,
    height: 25,
    anchor: {x: 16, y: 32},
    src: pointImage,
  },
}
</script>

<template>
  <tmap-map :mapKey="tencentMapDeveloperKey" :baseMap="baseMap"
            :center="center" :zoom="zoom" :doubleClickZoom="doubleClickZoom" :control="control">
    <tmap-multi-marker :styles="markerStyles" :geometries="markerGeometries"/>
  </tmap-map>
</template>

<style scoped>

</style>