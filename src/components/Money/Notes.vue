<template>
  <div>
    <label class="notes">
      <span class="name">备注：</span>
      <input type="text" placeholder="在这里输入备注" v-model="value">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Watch} from "vue-property-decorator";

@Component
export default class Notes extends Vue {
  value = '';

  @Watch('value')
  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }
}
</script>

<style scoped lang="scss">
.notes {
  padding: 12px 0 12px 16px;
  font-size: 14px;
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

</style>