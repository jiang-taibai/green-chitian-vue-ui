<script setup>
import {defineEmits, ref} from 'vue';
import GeoLocationFiled from "@/components/public/GeoLocationFiled.vue";
import NavBar from "@/components/public/NavBar.vue";
import AgroChemicalsInputFiled from "@/components/user/record/AgroChemicalsInputFiled.vue";

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


const onFarmlandChooseFinish = ({selectedOptions}) => {
  farmlandChooseForm.value.show = false;
  detailInfo.value.farmland = selectedOptions[0].text;
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
          <van-field v-model="detailInfo.note" autosize
                     label="备注" placeholder="请输入备注" rows="1" type="textarea"/>
        </van-cell-group>
      </div>
      <div class="position">
        <geo-location-filed :location="detailInfo.location"/>
      </div>
    </div>
    <van-cell-group title="农药/化肥记录" style="background: none;">
      <agro-chemicals-input-filed/>
    </van-cell-group>
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

  </div>

</template>

<style scoped lang="less">
.container {
  padding: 10px;
  border-bottom: none;
  background: #F2F2F2;
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