<template>
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
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";

@Component
export default class Tags extends Vue{

}
</script>

<style scoped>

</style>