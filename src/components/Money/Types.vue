<template>
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
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";

@Component
export default class Types extends Vue{
  // @Prop() readonly value!:string
  get type(){
    return this.$store.getters.getType
  }
  selectType(type: string): void {
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown');
    }

    this.$store.commit('updateRecord',{type})
  }
}
</script>

<style scoped lang="scss">
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
</style>