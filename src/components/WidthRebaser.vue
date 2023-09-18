<script setup lang="ts">
</script>

<template>
  <div class="width-rebaser-outer">
    <div class="width-rebaser-inner">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.width-rebaser-outer {
  position: relative;
  display: table;
  width: 100%;

  .width-rebaser-inner {
    display: table-cell;
    width: 1px;

    > * {
      min-width: 100%;
    }
  }
}
</style>
