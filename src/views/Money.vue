<template>
  <div>
    <Layout class-prefix="layout">
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
          <button @click="ok" class="ok">OK</button>
          <button @click="inputContent" class="zero">0</button>
          <button @click="inputContent">.</button>
        </div>
      </div>
      <Notes/>
      <Date class="date"></Date>
      <Tags/>
      <div class="count" :class="type==='-'?'out':'in'">{{ count }}</div>
      <Types/>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import Date from "@/components/Date.vue";
import Types from "@/components/Money/Types.vue";
import Tags from "@/components/Money/Tags.vue";
import Notes from "@/components/Money/Notes.vue";

@Component({
  components: {Notes, Tags, Types, Date}
})
export default class Money extends Vue {


  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get type(){
    return this.$store.getters.getType
  }

  count='0';

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

  ok(){
    this.$store.commit('saveRecord',this.count)
    this.count='0'
  }

}

</script>

<style scoped lang="scss">
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
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

      $bg: #ebafcb;

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