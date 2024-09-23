<script setup>
import {defineEmits, ref} from 'vue';
import GeoLocationFiled from "@/components/public/GeoLocationFiled.vue";
const emits = defineEmits(['commit']);

const afterRead = (file) => {
  console.log(file);
  //把图片加入
};
const detailInfo = ref({
  id: '',
  fileList: [],
  farmland: "",
  date: "",
  agroChemicals: "",
  dosageNumber: 0.00,
  dosageUnit: "g",
  note: "",
  location:{
    latitude: 0.00,
    longitude: 0.00,
  }
});
const back = () => history.back();
const commit=(value)=>{
  emits('commit',...value)
}
</script>

<template>
  <van-nav-bar title="记录 - 上传" left-text="返回" left-arrow @click-left="back" fixed placeholder/>
  <div class="container">
    <div class="detail">
      <van-cell-group inset style="margin: 0">
        <van-field v-model="detailInfo.farmland" label="农田" required  placeholder="请输入农田" input-class="custom-input"/>
        <van-field v-model="detailInfo.agroChemicals" label="农药/化肥" required placeholder="请输入农药/化肥"/>
        <van-field v-model="detailInfo.dosageUnit" type="digit" label="用量" required placeholder="请输入用量"/>
        <van-field v-model="detailInfo.note" label="备注" placeholder="请输入备注"/>
      </van-cell-group>
      <div class="position">
        <geo-location-filed :location="detailInfo.location"/>
      </div>
      <div class="uploadImage">
        <span class="span">上传图片:</span>
        <van-uploader v-model="fileList" multiple :after-read="afterRead"/>
      </div>
      <div class="button">
        <van-button type="primary" size="large" @click="commit">提交</van-button>
      </div>
    </div>
  </div>

</template>

<style scoped lang="less">
.uploadImage{
  margin: 16px;
  display: flex;
  justify-content: left;
  align-items: center;
  .span{
    margin-right: 20px;
  }
}
.button{
  margin: 16px;
}
</style>