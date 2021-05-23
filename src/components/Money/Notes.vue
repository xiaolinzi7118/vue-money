<template>
  <div>
    <label class="notes">
      <span class="name">备注：</span>
      <div><van-field
          @input="changeNotes($event)"
          maxlength="12"
          placeholder="在这里输入备注"
          :value="value"
      ></van-field>
      </div>
      <!--      <input type="text" placeholder="在这里输入备注" :value="value" @input="changeNotes($event)">-->
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import {Field} from "vant";


@Component({
  components:{
    [Field.name]:Field
  }
})
export default class Notes extends Vue {
  get value() {
    return this.$store.getters.getNotes
  }

  changeNotes(value) {
    this.$store.commit('updateRecord', {notes: value})
  }
}
</script>

<style scoped lang="scss">
.notes {
  padding-left: 16px;
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