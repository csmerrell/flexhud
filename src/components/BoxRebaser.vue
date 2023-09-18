<script setup lang="ts">
/**
 * Author: Claire Merrell
 * Date: Sept 16, 2023
 */

/**
 * This is a scriptless components. It uses a Pure CSS trick to wrap around html
 *   elements and reset their `absolute` coordinate plane.
 *
 * When wrapped in a `BoxRebaser`, any absolute coordinate set to 100% will
 *   be exactly at the respective edge of this container.
 * */

/**
 * ==== Examples ====
 * .box-rebaser .child-element {
 *    position: absolute;
 *    top: 100%;
 * } //Child will render EXACTLY at the bottom of the container;
 *
 * .box-rebaser .child-element {
 *    position: absolute;
 *    bottom: 100%;
 * } //Child will render EXACTLY at the top of the container;
 *
 * .box-rebaser .child-element {
 *    position: absolute;
 *    left: 100%;
 * } //Child will render EXACTLY at the right of the container;
 *
 * .box-rebaser .child-element {
 *    position: absolute;
 *    right: 100%;
 * } //Child will render EXACTLY at the left of the container;
 */

/**
 * ==== How it works ====
 * Absolute coordinate scope in CSS uses the nearest ancestor with `position: relative`
 *   as its reference anchor. (If no ancestor has explicit `position: relative`, it
 *   uses the body element as its coordinate reference).
 *
 * `height: 100%`, however, calculates the pixel value of 100% using the nearest ancestor
 *   with an explicit `height/width: ---px` css rule. (It skips elements with `height/width: --%`)
 *   If no ancestor has an explicit pixel value height/width rule, it uses the body element's
 *   height/width.
 *
 * Lastly, an element with `display: table-cell` inside an element with `display: table`
 *   has its height/width css rules ignored. A table-cell will ALWAYS fill 100% of its immmediate
 *   parent.
 *
 * This component combines those 3 quirks:
 *
 * .bind-outer has `position: relative` to trap any `absolute` positioned elements inside it.
 *
 * .bind-outer has `display: table` and `height: 100%` and `width: 100%` so it:
 *   1. Fills its parent.
 *   2. Allows its child to set a pixel height/width (which will be ignored).
 *
 * .bind-inner has `display: table-cell` and `height: 1px` so it:
 *   1. Has a pixel height/width rule, which makes its derived height the reference height/width
 *      for all of its decendents %-height/width calculations.
 *   2. Renders as a table-cell, so it will ignore an arbitrary 1px height/width and fill 100% of
 *      its parent anyway.
 */
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
