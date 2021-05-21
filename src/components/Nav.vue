<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      记账
    </router-link>
    <router-link to="/detail" class="item" active-class="selected">
      流水
    </router-link>
    <router-link to="/report" class="item" active-class="selected">
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

</style>