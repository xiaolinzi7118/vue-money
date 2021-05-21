<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="1"></Icon>
      记账
    </router-link>
    <router-link to="/detail" class="item" active-class="selected">
      <Icon name="2"></Icon>
      流水
    </router-link>
    <router-link to="/report" class="item" active-class="selected">
      <Icon name="3"></Icon>
      报表
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "Nav"
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/helper.scss";
nav {
  display: flex;
  @extend %outerShadow;
  flex-direction: row;
  font-size: 12px;

  > .item {
    padding: 2px 0;
    width: 33.33333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .icon {
      width: 32px;
      height: 32px;
    }
  }

  > .item.selected {
    color: #ff6c6f;
  }
}
</style>