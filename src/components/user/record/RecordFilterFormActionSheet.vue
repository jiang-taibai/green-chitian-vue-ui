<script setup>
import {ref, defineProps, defineEmits, watch} from 'vue';
import {showFailToast} from 'vant';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  filterData: {
    type: Object,
    default: () => ({
      farmlandText: "所有农田",
      farmlandValue: "0",
      dateText: "所有时间段",
      dateStart: "",
      dateEnd: "",
    }),
  },
});
const emit = defineEmits(['update:show', 'update:filterData']);

// 实现子组件的双向绑定，同时保持父组件的数据不变
const showFilterActionSheet = ref(false);
watch(() => props.show, (value) => {
  showFilterActionSheet.value = value;
});
watch(() => showFilterActionSheet.value, (value) => {
  emit('update:show', value);
});
const localFilterData = ref(props.filterData);
watch(() => props.filterData, (value) => {
  localFilterData.value = {...value};
});

const farmlands = [
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
];
const showFarmlandPicker = ref(false);
/**
 * 确认选择农田
 * @param value
 */
const onConfirmFarmland = ({selectedOptions}) => {
  showFarmlandPicker.value = false;
  localFilterData.value.farmlandText = selectedOptions[0].text;
  localFilterData.value.farmlandValue = selectedOptions[0].value;
};

const dateRangeTypeChecked = ref("all");

const showDatePicker = ref(false);
const formatDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
const minDate = new Date(2024, 0, 1);
const maxDate = new Date();
/**
 * 确认选择日期区间
 * @param values
 */
const onConfirmDatePicker = (values) => {
  const [start, end] = values;
  showDatePicker.value = false;
  const formatedStartDate = formatDate(start);
  const formatedEndDate = formatDate(end);
  localFilterData.value.dateText = `${formatedStartDate} ~ ${formatedEndDate}`;
  localFilterData.value.dateStart = formatedStartDate;
  localFilterData.value.dateEnd = formatedEndDate;
};

const onConfirmActionSheet = () => {
  // 校验筛选条件
  if (dateRangeTypeChecked.value === 'all' || localFilterData.value.dateText === "所有时间段") {
    localFilterData.value.dateText = "所有时间段";
    localFilterData.value.dateStart = "";
    localFilterData.value.dateEnd = "";
  } else {
    if (!localFilterData.value.dateStart || !localFilterData.value.dateEnd) {
      showFailToast("请选择日期区间，或选择所有时间段");
      return;
    }
  }
  emit('update:filterData', {...localFilterData.value});
};
</script>

<template>
  <van-action-sheet v-model:show="showFilterActionSheet" title="筛选记录">
    <div class="action-sheet-container">
      <van-field v-model="localFilterData.farmlandText" is-link readonly
                 label="选择农田" placeholder="选择农田"
                 @click="showFarmlandPicker = true"/>
      <van-radio-group v-model="dateRangeTypeChecked">
        <van-cell-group style="margin: 0" inset>
          <van-cell style="padding: 10px 16px" title="所有时间段" clickable @click="dateRangeTypeChecked = 'all'">
            <template #right-icon>
              <van-radio name="all"/>
            </template>
          </van-cell>
          <van-cell style="padding: 10px 16px" title="部分时间段" clickable @click="dateRangeTypeChecked = 'part'">
            <template #right-icon>
              <van-radio name="part"/>
            </template>
          </van-cell>
          <van-cell v-show="false" title="仅用来生成虚线，请勿删除"/>
        </van-cell-group>
      </van-radio-group>
      <van-cell title="选择日期区间" :value="localFilterData.dateText" @click="showDatePicker = true"
                v-show="dateRangeTypeChecked==='part'" class="pd-0-20"/>
      <van-calendar v-model:show="showDatePicker" type="range"
                    :min-date="minDate" :max-date="maxDate"
                    @confirm="onConfirmDatePicker"/>
      <van-button block round type="primary" size="small" style="margin-top: 16px" @click="onConfirmActionSheet">确认
      </van-button>
    </div>
  </van-action-sheet>
  <van-popup v-model:show="showFarmlandPicker" round position="bottom">
    <van-picker
        :columns="farmlands"
        @cancel="showFarmlandPicker = false"
        @confirm="onConfirmFarmland"
    />
  </van-popup>
</template>

<style scoped>
.action-sheet-container {
  padding: 16px;
}
</style>