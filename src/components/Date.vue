<template>
    <div>
      <div class="pickDate" @click="xxx">
        <van-button round  plain type="primary" class="pick" @click="showPopFn">请选择日期</van-button>
        <van-field class="result" v-model="timeValue" readonly/>
      </div>
      <div>
        <van-popup v-model="show" round position="bottom" :style="{ height: '50%' }">
          <van-datetime-picker
              v-model="currentDate"
              type="date"
              title="选择年月日"
              :min-date="minDate"
              :max-date="maxDate"
              :formatter="formatter"
              @confirm="confirmFn"
              @cancel="cancelFn"
          />
        </van-popup>
      </div>
    </div>
</template>

<script lang="ts">
import {DatetimePicker, Popup, Button, Field} from 'vant';
import Vue from "vue";
import {Component} from "vue-property-decorator";
import moment from 'moment'


@Component({
  components: {
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Field.name]: Field
  }
})
export default class Detail extends Vue {
  currentDate = new Date();
  minDate = new Date(2020, 0, 1);
  maxDate = new Date(2022, 11, 1);
  show = false;
  msg = '';
  timeValue = '今天';
  time='';

  // showPopup() {
  //   this.show = true;
  // }

  showPopFn() {
    this.show = true;
  }

  xxx() {
    this.show = true;
  }


  formatter(type:string, val:string) {
    if (type === 'year') {
      return val + '年';
    }
    if (type === 'month') {
      return val + '月';
    }
    if (type === 'day') {
      return val + '日';
    }
    return val;
  }

  confirmFn() { // 确定按钮
    this.timeValue = this.timeFormat(this.currentDate);
    this.show = false;
  }

  cancelFn() {
    this.show = false;
  }

  timeFormat(time:Date) { // 时间格式化 2019-09-08
    const DATE_FORMAT = 'yyyy-MM-DD'
    // const today = moment(new Date()).format(DATE_FORMAT)
    this.time  = moment(time).format(DATE_FORMAT)
    // if(today===timeToday){
    //   return '今天'
    // }
    this.$emit('update:value', this.time);
    return this.time
  }

  mounted() {
    this.timeFormat(new Date());
  }
}
</script>

<style scoped lang="scss">
.pickDate {
  display: flex;
  flex-direction: row;
  margin: 5px;
  .pick {
    flex-shrink: 0;
    color: black;
    border-color: black;
    width: 120px;
    height: 30px;
    line-height: 16px;
  }
  .result{
    //width: 100px;
    border: none;
    line-height: 16px;
  }
}
</style>