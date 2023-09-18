<script setup lang="ts">
/**
 * Author: Claire Merrell
 * Date: Sept 16, 2023
 */

/**
 * This is a scriptless components. It uses a Pure CSS trick to wrap around html
 *   elements and reset their `absolute` coordinate plane.
 *
 * When wrapped in a `WidthRebaser`, any absolute coordinate set to 100% will
 *   be exactly at the respective edge of this container.
 * */

/**
 * ==== Examples ====
 * .width-rebaser .child-element {
 *    position: absolute;
 *    left: 100%;
 * } //Child will render EXACTLY at the right of the container;
 *
 * .width-rebaser .child-element {
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
 * `width: 100%`, however, calculates the pixel value of 100% using the nearest ancestor
 *   with an explicit `width: ---px` css rule. (It skips elements with `width: --%`)
 *   If no ancestor has an explicit pixel value width rule, it uses the body element's
 *   width.
 *
 * Lastly, an element with `display: table-cell` inside an element with `display: table`
 *   has its width css rules ignored. A table-cell will ALWAYS fill 100% of its immmediate
 *   parent.
 *
 * This component combines those 3 quirks:
 *
 * .bind-outer has `position: relative` to trap any `absolute` positioned elements inside it.
 *
 * .bind-outer has `display: table` and `width: 100%` so it:
 *   1. Fills its parent.
 *   2. Allows its child to set a pixel width (which will be ignored).
 *
 * .bind-inner has `display: table-cell` and `width: 1px` so it:
 *   1. Has a pixel width rule, which makes its derived width the reference width
 *      for all of its decendents %-width calculations.
 *   2. Renders as a table-cell, so it will ignore an arbitrary 1px width and fill 100% of
 *      its parent anyway.
 */
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
