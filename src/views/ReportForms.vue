<template>
  <Layout>
    <div class="statistics">
      <div class="year">{{year}}年支出收入概览</div>
      <section class="echarts_wrap">
        <div id="echarts"></div>
      </section>
      <div class="footer">
        支出：{{ expenseMoney }}元 | 收入： {{ incomeMoney }}元
      </div>
    </div>
  </Layout>
</template>

<script>
import moment from 'moment'
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入饼状图组件
require("echarts/lib/chart/pie");
// 引入legend和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");
require("echarts/lib/model/Series");
export default {
  data() {
    return {
      tallyData: this.$store.getters.getRecordList,
      year:moment(new Date()).year()
    };
  },
  computed:{
    expenseMoney(){
      return this.initMoney('-')
    },
    incomeMoney(){
      return this.initMoney('+')
    }
  },
  methods: {
    //   初始化echarts表
    initEcharts() {
      //初始化echarts实例
      let myChart = echarts.init(document.getElementById("echarts"));
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        series: [
          {
            name: "支出统计",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              {
                value: this.expenseMoney,
                name: "支出",
                itemStyle: {
                  color: "#6fcf97",
                  fontSize:"16px",
                },
              },
              {
                value: this.incomeMoney,
                name: "收入",
                itemStyle: {
                  color: "#eb5757",
                  fontSize:"16px",
                },
              },
            ],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    //初始化收入和支出总金额
    initMoney(type) {
      const a=this.tallyData.filter(item=>moment(item.date).year()===this.year)
      const b=a.filter(i=>i.type===type).map(l=>l.output);
      const value=b.reduce((total, val) => {
        return val + total
      }, 0);
      return value
    }
  },
  mounted() {
    this.$nextTick(() => this.initEcharts());
  },
};
</script>

<style scoped lang="scss">
.statistics {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .echarts_wrap {
    display: flex;
    justify-content: center;
    #echarts {
      width: 300px;
      height: 300px;
    }
  }
  .year{
    background: rgb(2, 0, 36);
    background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%,
        rgba(213, 126, 231, 1) 0%, rgba(255, 107, 108, 1) 100%);
    color: white;
    text-align: center;
    padding: 1rem;
  }
  .footer {
    margin-top: 20px;
    padding: 8px 10px;
    text-align: center;
    color: white;
    background: rgb(2, 0, 36);
    background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%,
        rgba(213, 126, 231, 1) 0%, rgba(255, 107, 108, 1) 100%);
    border-radius: 10px;
  }
}
</style>