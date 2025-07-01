<script setup>
import {ref, toValue} from 'vue';
import GeoLocationFiled from "@/components/public/GeoLocationFiled.vue";
import NavBar from "@/components/public/NavBar.vue";
import AgroChemicalsInputFiled from "@/components/user/record/AgroChemicalsInputFiled.vue";
import FarmlandChooseFormPickerPopup from "@/components/public/picker-popup/FarmlandChooseFormPickerPopup.vue";
import {isSuccessResponse} from "@/assets/js/api/response-utils.js";
import {showFailToast, showSuccessToast} from "@/assets/js/plugins/vant-toast.js";
import {onUploadRecord} from "@/components/user/record/workflow-upload.js";
import {useRouter} from "vue-router";

/* =============== 数据 ================== */
const router = useRouter();
const farmlandChooseForm = ref({
  show: false,
  text: void 0,
  value: void 0,
})
const note = ref('')
const location = ref({
  text: "未知位置",
  latitude: 0.00,
  longitude: 0.00,
})
const agroChemicalInfos = ref([])
const fileList = ref([])

/* =============== 方法 ================== */
/**
 * 选择农田完成
 * @param selectedOptions {PickerOption[]}  选择的农田
 */
const onFarmlandChooseFinish = ({selectedOptions}) => {
  farmlandChooseForm.value.text = selectedOptions[0].text;
  farmlandChooseForm.value.value = selectedOptions[0].value;
};

/**
 * 提交表单
 */
const onCommit = async () => {
  onUploadRecord({
    farmlandChooseForm: toValue(farmlandChooseForm),
    agroChemicalInfos: toValue(agroChemicalInfos),
    note: toValue(note),
    fileList: toValue(fileList),
    location: toValue(location),
  }).then(/** @param res {Result} */res => {
    if (isSuccessResponse(res)) {
      const id = res.data.id
      showSuccessToast("上传成功");
      router.push({name: 'RecordDetail', params: {id: id}});
    } else {
      showFailToast(res.message);
    }
  }).catch((err) => {
    showFailToast(err.message);
  });
}
</script>

<template>
  <div>
    <nav-bar title="记录 - 上传" back/>
    <div class="container">
      <!-- 基本信息表单：农田、备注、位置 -->
      <div class="form">
        <div class="detail">
          <van-cell-group style="margin: 0;">
            <van-field v-model="farmlandChooseForm.text" is-link readonly required
                       label="农田" placeholder="请选择农田"
                       @click="farmlandChooseForm.show = true"/>
            <van-field v-model="note" autosize
                       label="备注" placeholder="请输入备注" rows="1" type="textarea"/>
          </van-cell-group>
        </div>
        <div class="position">
          <geo-location-filed v-model:location="location"/>
        </div>
      </div>
      <!-- 农药化肥的添加记录表单 -->
      <van-cell-group title="农药/化肥记录" style="background: none;">
        <agro-chemicals-input-filed v-model="agroChemicalInfos"/>
      </van-cell-group>
      <!-- 图片上传列表 -->
      <van-cell-group title="图片上传" style="background: none;">
        <div class="upload-container">
          <van-uploader class="uploader" v-model="fileList" multiple preview-size="26vw"/>
        </div>
      </van-cell-group>
      <!-- 上传按钮 -->
      <div class="button">
        <van-button type="primary" @click="onCommit" block round size="small">上传</van-button>
      </div>
      <!-- 挑选农地的 Picker 弹窗 -->
      <farmland-choose-form-picker-popup v-model:show="farmlandChooseForm.show" :init-with-all="false"
                                         @confirm="onFarmlandChooseFinish"/>
    </div>
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