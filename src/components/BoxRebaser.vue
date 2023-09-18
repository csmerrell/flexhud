<script setup lang="ts">
</script>

<template>
  <div class="box-rebaser-outer">
    <div class="box-rebaser-inner">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.box-rebaser-outer {
  position: relative;
  display: table;
  height: 100%;
  width: 100%;

  .box-rebaser-inner {
    display: table-cell;
    height: 1px;
    width: 1px;

    > * {
      min-height: 100%;
      min-width: 100%;
    }
  }
}
</style>
