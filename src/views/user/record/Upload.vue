<script setup>
import {defineEmits, ref} from 'vue';
import GeoLocationFiled from "@/components/public/GeoLocationFiled.vue";
import NavBar from "@/components/public/NavBar.vue";

const emits = defineEmits(['commit']);

const afterRead = (file) => {
  console.log(file);
};
const detailInfo = ref({
  id: '',
  fileList: [],
  farmland: "",
  date: "",
  agroChemicals: "",
  dosageNumber: 0.00,
  dosageUnitText: "克",
  dosageUnitValue: "g",
  note: "",
  location: {
    latitude: 0.00,
    longitude: 0.00,
  }
});

const farmlandChooseForm = ref({
  show: false,
  options: [
    {text: "所有农田", value: "0"},
    {text: "农田1", value: "1"},
    {text: "农田2", value: "2"},
    {text: "农田3", value: "3"},
    {text: "农田4", value: "4"},
    {text: "农田5", value: "5"},
    {text: "农田6", value: "6"},
    {text: "农田7", value: "7"},
    {text: "农田8", value: "8"},
    {text: "农田9", value: "9"},
    {text: "农田10", value: "10"}
  ]
})
const dosageUnitChooseForm = ref({
  show: false,
  options: [
    {text: "千克", value: "kg"},
    {text: "克", value: "g"},
    {text: "斤", value: "jin"},
  ]
})

const onFarmlandChooseFinish = ({selectedOptions}) => {
  farmlandChooseForm.value.show = false;
  detailInfo.value.farmland = selectedOptions[0].text;
};
const onDosageUnitChooseFinish = ({selectedOptions}) => {
  dosageUnitChooseForm.value.show = false;
  detailInfo.value.dosageUnitText = selectedOptions[0].text;
  detailInfo.value.dosageUnitValue = selectedOptions[0].value;
};

const commit = (value) => {
  emits('commit', {...value})
}
</script>

<template>
  <nav-bar title="记录 - 上传" back/>
  <div class="container">
    <div class="form">
      <div class="detail">
        <van-cell-group style="margin: 0;">
          <van-field v-model="detailInfo.farmland" is-link readonly required
                     label="农田" placeholder="请选择农田"
                     @click="farmlandChooseForm.show = true"/>
          <van-field v-model="detailInfo.agroChemicals" required
                     label="农药/化肥" placeholder="请输入农药/化肥"/>
          <van-field v-model="detailInfo.dosageNumber" required
                     type="number" label="用量" placeholder="请输入用量"/>
          <van-field v-model="detailInfo.dosageUnitText" is-link readonly required
                     label="用量单位" placeholder="请选择用量单位"
                     @click="dosageUnitChooseForm.show = true"/>
          <van-field v-model="detailInfo.note" autosize
                     label="备注" placeholder="请输入备注" rows="1" type="textarea"/>
        </van-cell-group>
      </div>
      <div class="position">
        <geo-location-filed :location="detailInfo.location"/>
      </div>
    </div>
    <van-cell-group title="图片上传" style="background: none;">
      <div class="upload-container">
        <van-uploader class="uploader" v-model="detailInfo.fileList" multiple :after-read="afterRead"
                      preview-size="26vw"/>
      </div>
    </van-cell-group>
    <div class="button">
      <van-button type="primary" @click="commit" block round size="small">上传</van-button>
    </div>
    <van-popup v-model:show="farmlandChooseForm.show" round position="bottom">
      <van-picker :columns="farmlandChooseForm.options"
                  @cancel="farmlandChooseForm.show = false" @confirm="onFarmlandChooseFinish"/>
    </van-popup>
    <van-popup v-model:show="dosageUnitChooseForm.show" round position="bottom">
      <van-picker :columns="dosageUnitChooseForm.options"
                  @cancel="dosageUnitChooseForm.show = false" @confirm="onDosageUnitChooseFinish"/>

    </van-popup>
  </div>

</template>

<style scoped lang="less">
.container {
  padding: 10px;
  border-bottom: none;
}

* {
  font-size: 14px;
}

.upload-container {
  padding: 0 10px;
}

.button {
  border-radius: 15px;
  margin-top: 8px;
}

.form {
  border-radius: 8px;
  background-color: #FFFFFF;
  overflow: hidden;
}

.position {
  padding: 10px 16px;
}
</style>