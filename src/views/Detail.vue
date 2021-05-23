<template>
  <Layout>
    <div class="selectMonth">
      <van-button round class="btn" @click="lessDate()" text='上个月'></van-button>
      <div class="month">{{ currentMonth }} 月支出</div>
      <van-button round class="btn" @click="moreDate()" text='下个月'></van-button>
    </div>
    <div class="none" v-if="list.length===0">当前没有数据哦~</div>
    <div v-else>
      <ul class="count">
        <li>收入：{{ collect }}</li>
        <li>支出：{{ outTotal }}</li>
        <li>结余：{{ totalCount }}</li>
      </ul>
      <van-list finished-text="没有更多了">
        <van-cell v-for="item in list" :key="item.date">
          <van-cell :title="item.date"/>
          <van-cell v-for="i in item.list" :key="i.id"
                    :title="i.selectTag">
            <div class="list">
              <div class="listNotes">{{ i.notes }}</div>
              <div class="listOutput">{{ i.output===0?0:i.type + i.output }}</div>
            </div>
          </van-cell>
        </van-cell>
      </van-list>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import {Button, Cell, List} from 'vant'
import {Component} from "vue-property-decorator";
import moment from "moment";

@Component({
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [Button.name]: Button
  }
})
export default class Detail extends Vue {
  currentMonth = moment(new Date()).month() + 1;


  get list() {
    const _list = this.$store.getters.getRecordList;
    const allDays = [...new Set(_list.map(item => item.date))];
    const newList = allDays.map(d => {
      const data = _list.filter(item => item.date === d)
      return {
        date: d,
        list: data
      }
    })
    return newList.filter(i => moment(i.date).month() + 1 === this.currentMonth)
  }

  get outTotal() {

    return this.getTotal('-')

  }

  get collect() {

    return this.getTotal('+')

  }


  getTotal(type: string) {
    const a = this.list.reduce((total, val) => {
      const {list} = val;
      total = [...total, ...list]
      return total
    }, []).filter(i => i.type === type).reduce((total, val) => {
      return val.output + total
    }, 0)
    return a
  }

  get totalCount() {
    return this.collect - this.outTotal
  }

  lessDate() {
    if (this.currentMonth > 1) {
      this.currentMonth -= 1
    }
  }

  moreDate() {
    if (this.currentMonth < 12) {
      this.currentMonth += 1
    }
  }

}
</script>

<style scoped lang="scss">
.selectMonth {
  display: flex;
  flex-direction: row;
  padding: 1rem;
  justify-content: space-evenly;
  color: white;
  background: rgb(2, 0, 36);
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%,
      rgba(213, 126, 231, 1) 0%, rgba(255, 107, 108, 1) 100%);

  .btn {
    background: rgba(0, 0, 0, 0);
    color: white;
  }

  .month {
    width: 40%;
    line-height: 44px;
    padding: 0 10px;
    text-align: center;
  }
}

.none {
  padding: 1rem;
  text-align: center;
}

.count {
  color: white;
  background: rgb(2, 0, 36);
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%,
      rgba(213, 126, 231, 1) 0%, rgba(255, 107, 108, 1) 100%);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0.2rem;
}

.list{
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .listNotes{

  }
  .listOutput{
    color:black;
  }
}
</style>