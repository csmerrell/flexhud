<script setup lang="ts">
</script>

<template>
  <div class="height-rebaser-outer">
    <div class="height-rebaser-inner">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.height-rebaser-outer {
  position: relative;
  display: table;
  height: 100%;

  .height-rebaser-inner {
    display: table-cell;
    height: 1px;

    > * {
      min-height: 100%;
    }
  }
}
</style>
