<template>
  <div v-if="type==='-'">
    <ul class="tags">
      <li v-for="tag in tagList1" :key="tag.value" @click="toggle(tag.value)"
          :class="{selected:selectTag===tag.value}">
        <Icon :name="tag.name"></Icon>
        <div>{{ tag.value }}</div>
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
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";

@Component
export default class Tags extends Vue{
  get type(){
    return this.$store.getters.getType
  }

  get selectTag(){
    return this.$store.getters.getSelect
  }
  tagList1=[
    {name: '4', value: '餐费'},
    {name: '5', value: '早餐'},
    {name: '6', value: '午餐'},
    {name: '7', value: '晚费'},
    {name: '8', value: '零食'},
    {name: '9', value: '水果'},
    {name: '10', value: '买菜'},
    {name: '11', value: '烟酒'},
    {name: '12', value: '购物'},
    {name: '13', value: '其他'}
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
    {name: '22', value: '礼金'},
    {name: '13', value: '其他'}
  ];
 toggle(tag: string): void {
    this.$store.commit('updateRecord',{selectTag:tag})
  }
}
</script>

<style scoped lang="scss">
.tags {
  height: 164px;
  width: 100%;
  display: flex;
  border-top: 2px solid rgba(0, 0, 0, 0.05);
  background: #fbfcff;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;

  > li {
    width: 64px;
    height: 64px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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
</style>