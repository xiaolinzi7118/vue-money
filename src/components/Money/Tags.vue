<template>
  <div v-if="type === '-'">
    <ul class="tags">
      <li
        v-for="tag in tagList1"
        :key="tag.value"
        @click="toggle(tag.value)"
        :class="{ selected: selectTag === tag.value }"
      >
        <Icon :name="tag.name"></Icon>
        <div>{{ tag.value }}</div>
      </li>
    </ul>
  </div>
  <div v-else>
    <ul class="tags">
      <li
        v-for="tag in tagList2"
        :key="tag.value"
        @click="toggle(tag.value)"
        :class="{ selected: selectTag === tag.value }"
      >
        <Icon :name="tag.name"></Icon>
        <div>{{ tag.value }}</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Tags extends Vue {
  get type() {
    return this.$store.getters.getType;
  }

  get selectTag() {
    return this.$store.getters.getSelect;
  }
  get tagList1() {
    return this.$store.state.tagList1;
  }
  get tagList2() {
    return this.$store.state.tagList2;
  }
  toggle(tag: string): void {
    this.$store.commit("updateRecord", { selectTag: tag });
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