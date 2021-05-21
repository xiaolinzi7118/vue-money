<template>
  <div>
    <Layout class-prefix="layout">
      <div>
        <ul class="types">
          <li class="out"
              :class="type === '-' && 'selected'"
              @click="selectType('-')">支出
          </li>
          <li class="in"
              :class="type === '+' && 'selected'"
              @click="selectType('+')">收入
          </li>
        </ul>
      </div>
      <div class="count" :class="type==='-'?'out':'in'">{{ count }}</div>
      <div v-if="type==='-'">
        <ul class="tags">
          <li v-for="tag in tagList1" :key="tag.value" @click="toggle(tag.value)"
              :class="{selected:selectTag===tag.value}">
            <Icon :name="tag.name"></Icon>
            <div>{{ tag.value }}</div>
          </li>
          <li>
            <Icon name="13" class="icon"></Icon>
            <div>其他</div>
          </li>
        </ul>
      </div>
      <div v-else>
        <ul class="tags">
          <li v-for="tag in tagList2" :key="tag.value" @click="toggle(tag.value)"
              :class="{selected:selectTag===tag.value}">
            <Icon :name="tag.name"></Icon>
            <div>{{ tag.value }}</div>
          </li>
          <li>
            <Icon name="13" class="icon"></Icon>
            <div>其他</div>
          </li>
        </ul>
      </div>
      <div>
        <label class="notes">
          <span class="name">备注：</span>
          <input type="text" placeholder="在这里输入备注" v-model="value">
        </label>
      </div>
      <div class="numberPad">
        <div class="buttons">
          <button @click="inputContent">1</button>
          <button @click="inputContent">2</button>
          <button @click="inputContent">3</button>
          <button @click="remove">删除</button>
          <button @click="inputContent">4</button>
          <button @click="inputContent">5</button>
          <button @click="inputContent">6</button>
          <button @click="clear">清空</button>
          <button @click="inputContent">7</button>
          <button @click="inputContent">8</button>
          <button @click="inputContent">9</button>
          <button class="ok">OK</button>
          <button @click="inputContent" class="zero">0</button>
          <button @click="inputContent">.</button>
        </div>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";

@Component
export default class Money extends Vue {
  type = '-';
  count = '0';
  tagList1 = [
    {name: '4', value: '餐费'},
    {name: '5', value: '早餐'},
    {name: '6', value: '午餐'},
    {name: '7', value: '晚费'},
    {name: '8', value: '零食'},
    {name: '9', value: '水果'},
    {name: '10', value: '买菜'},
    {name: '11', value: '烟酒'},
    {name: '12', value: '购物'}
  ];
  tagList2 = [
    {name: '14', value: '工资'},
    {name: '15', value: '收租'},
    {name: '16', value: '兼职'},
    {name: '17', value: '报销'},
    {name: '18', value: '奖金'},
    {name: '19', value: '红包'},
    {name: '20', value: '理财'},
    {name: '21', value: '投资'},
    {name: '22', value: '礼金'}
  ];
  selectTag = '';
  value = '';

  selectType(type: string): void {
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown');
    }
    this.type = type;
  }

  toggle(tag: string): void {
    this.selectTag = tag;
  }

  inputContent(event: MouseEvent) {
    const button = (event.target as HTMLButtonElement);
    const input = button.textContent!;
    if (this.count.length === 16) {
      return;
    }
    if (this.count === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        this.count = input;
      } else {
        this.count += input;
      }
      return;
    }
    if (this.count.indexOf('.') >= 0 && input === '.') {
      return;
    }
    this.count += input;
  }

  remove() {
    if (this.count.length === 1) {
      this.count = '0';
    } else {
      this.count = this.count.slice(0, -1);
    }
  }

  clear() {
    this.count = '0';
  }

}

</script>

<style scoped lang="scss">
::v-deep .layout-content {
  display: flex;
  flex-direction: column;
}

.notes {
  padding: 12px 0;
}

.types {
  display: flex;
  text-align: center;
  padding-left: 20%;
  font-weight: bold;
  color: #c4c4c4;

  > li {
    height: 36px;
    width: 37.5%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
    }

    &.selected.out {
      color: green;
    }

    &.selected.out::after {
      background: green;
    }

    &.selected.in {
      color: #fd6d6d;
    }

    &.selected.in::after {
      background: #fd6d6d;
    }
  }
}

.count {
  font-size: 36px;
  padding: 9px 16px;
  text-align: right;
  height: 72px;
}

.count.out {
  color: green;
}

.count.in {
  color: red;
}

.tags {
  height: 216px;
  width: 100%;
  display: flex;
  border-top: 2px solid rgba(0, 0, 0, 0.05);
  background: #fbfcff;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 24px;
  justify-content: center;
  align-items: center;

  > li {
    width: 64px;
    height: 64px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &.selected {
      background: white;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
    }
  }

  .icon {
    width: 2em;
    height: 2em;
    margin: 1px;
  }
}

.notes {
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;

  .name {
    padding-right: 12px;
  }

  input {
    height: 16px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}

@import "~@/assets/style/helper.scss";

.numberPad {
  .buttons {
    @extend %clearFix;

    > button {
      width: 25%;
      height: 60px;
      float: left;
      background: transparent;
      border: none;

      &.ok {
        height: 60*2px;
        float: right;
      }

      &.zero {
        width: 25*2%;
      }

      $bg: #e3e7f1;

      &:nth-child(1) {
        background: $bg;
      }

      &:nth-child(2), &:nth-child(5) {
        background: darken($bg, 4%);
      }

      &:nth-child(3), &:nth-child(6), &:nth-child(9) {
        background: darken($bg, 4*2%);
      }

      &:nth-child(4), &:nth-child(7), &:nth-child(10) {
        background: darken($bg, 4*3%);
      }

      &:nth-child(8), &:nth-child(11), &:nth-child(13) {
        background: darken($bg, 4*4%);
      }

      &:nth-child(14) {
        background: darken($bg, 4*5%);
      }

      &:nth-child(12) {
        background: darken($bg, 4*6%);
      }
    }
  }
}
</style>