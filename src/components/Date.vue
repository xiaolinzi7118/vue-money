<template>
    <div>
      <div class="pickDate" @click="showPopFn">
        <van-button round  plain type="primary" class="pick">请选择日期</van-button>
        <van-field class="result" :value="dateTime" readonly/>
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
  minDate = new Date(2021, 0, 1);
  maxDate = new Date(2021, 11, 31);
  show = false;
  msg = '';
  timeValue = '今天';

  get dateTime():string{
    const today=moment(new Date()).format('yyyy-MM-DD');
    const dateTime=this.$store.getters.getDate
    return dateTime===today? '今天':dateTime
  }



  showPopFn():void {
    this.show = true;
  }




  formatter(type:string, val:string):string {
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

  confirmFn():void { // 确定按钮
    const _time=moment(this.currentDate).format('yyyy-MM-DD');
    this.$store.commit('updateRecord',{date:_time});
    this.show = false;
  }

  cancelFn() :void{
    this.show = false;
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