<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-family: $font-hei;
  font-size: 16px;
  line-height: 1.5;
  background: #fff;
}

#app {
  max-width: 500px;
  margin: 0 auto;
}
.oneLine {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
