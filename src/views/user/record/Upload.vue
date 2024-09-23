<script setup>
import {computed, defineEmits, ref} from 'vue';
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
  location: {
    latitude: 0.00,
    longitude: 0.00,
  }
});

const chooseForm = ref({
  show: false,
  farmlands: [
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
    {text: "农田10", value: "10"},
  ]
})
const onFinish = ({selectedOptions}) => {
  chooseForm.value.show = false;
  detailInfo.value.farmland = selectedOptions.map((option) => option.text).join('/');
};
const dosageUnit = computed(() => detailInfo.value.dosageUnit + 'g')
const back = () => history.back();
const commit = (value) => {
  emits('commit', ...value)
}
</script>

<template>
  <van-nav-bar title="记录 - 上传" left-text="返回" left-arrow @click-left="back" fixed placeholder/>
  <div class="container">
    <div class="form">
      <div class="detail">
        <van-cell-group style="margin: 0;">
          <van-field
              v-model="detailInfo.farmland"
              is-link
              readonly
              label="农田"
              placeholder="请选择农田"
              @click="chooseForm.show = true"
              required
          />
          <van-popup v-model:show="chooseForm.show" round position="bottom">
            <van-cascader
                title="请选择农田"
                :options="chooseForm.farmlands"
                @close="chooseForm.show = false"
                @finish="onFinish"
            />
          </van-popup>
          <van-field v-model="detailInfo.agroChemicals" label="农药/化肥" required placeholder="请输入农药/化肥"/>
          <van-field v-model="detailInfo.dosageUnit" type="digit" label="用量" required
                     placeholder="请输入用量，单位：千克"/>
          <van-field v-model="detailInfo.note" label="备注" placeholder="请输入备注" rows="1" autosize type="textarea"/>
        </van-cell-group>
      </div>
      <div class="position">
        <geo-location-filed :location="detailInfo.location"/>
      </div>
    </div>
    <div class="uploadImage">
      <div class="span">上传图片:</div>
      <van-uploader v-model="detailInfo.fileList" multiple :after-read="afterRead"/>
    </div>
    <div class="button">
      <van-button type="primary" @click="commit" block round size="small">提交</van-button>
    </div>
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

.uploadImage {
  margin: 10px;
  display: flex;
  flex-direction:row;
  .span {
    display: flex;
    align-items: center; /* 确保文字垂直居中 */
    min-width: 70px;
  }
}
.button {
  border-radius: 15px;
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