# Coordinate Rebase
This is a scriptless container component for changing the behavior of css height/width percentage measurements.

Percentage measurements depend on the nearest DOM ancestor with a fixed height or width, but css rules like flex & grid typically avoid using fixed heights.

Components in this package wrap content in a set of 2 divs that leverage browser `display: table` and `display: table-cell` rendering rules to effectively "catch" descendants' percentage height rules. Instead of referencing the nearest fixed-height ancestory, descendants with %-height rules will use these components' resolved height/width measurements for reference.

## Usage
Import the components in script setup:
```vue
<script setup>
  import { BoxRebaser, HeightRebaser, WidthRebaser } from "coordinate-rebase"
  
  //A sample array for rendering the example.
  const items = ref([
    {
      id: "child-1",
      display: "Child 1"
    },
    {
      id: "child-2",
      display: "Child 2"
    },
    {
      id: "child-3",
      display: "Child 3"
    },
    {
      id: "child-4",
      display: "Child 4"
    },
  ]);
</script>
```

Width Rebaser Markup Example:
```vue
<template>
  <div id="original-coordinate-reference">
    <div class="flex-row">
      <!-- This flex row will change its childrens' width without using a fixed 'width: ---px' rule -->
      <div v-for="(item,idx) in items" :key="item" :id="item.id">
        {{item.display}}
        <div v-if="item === 'Child 1'" class="idx-abs">
          <!-- This one will reference the dimensions of `#original-coordinate-reference` to compute left: 100%" -->
          <!-- Even though it's the first child, its absolute-positioned index will show at the end of the 4th child -->
          {{idx}}
        </div>
        <WidthRebaser v-else class="idx-abs">
          <!-- These ones will use the dimensions of their immediate parent to compute left: 100%" -->
          {{idx}}
        </WidthRebaser>
      </div>
    </div>
  </div>
</template>
```

Styles:
```vue
<style lang="scss">
.original-coordinate-reference {
  position: relative;
  height: 800px;
  width: 1200px;
  margin: 2rem;

  .flex-row {
    display: flex;
    flex-flow: row;
    div {
      padding: 1rem;
      border: 1px solid black;
      box-sizing: border-box;

      .idx-abs {
        position: absolute;
        left: 100%;
        border: 1px solid black;
      }
    }
  }
}
</style>
```

## How it works
Absolute coordinate scope in CSS uses the nearest ancestor with `position: relative` as its reference anchor. (If no ancestor has explicit `position: relative`, it uses the body element as its coordinate reference).

When position is set to `absolute`, however, `height/width: 100%` calculate the pixel value of 100% using the nearest ancestor with an explicit `height/width: ---px` css rule. (They skip elements with `height/width: --%`) If no ancestor has an explicit pixel value height/width rule, it uses the body element's height/width.

Lastly, an element with `display: table-cell` inside an element with `display: table` has its height/width css rules ignored. A table-cell will ALWAYS fill 100% of its immmediate table parent.

This component wraps content in 2 layers (`.bind-inner` and `.bind-outer`) to combine those 3 quirks:
* .bind-outer has `position: relative` to trap any `absolute` positioned elements inside it.

* .bind-outer has `display: table` and `height: 100%` and `width: 100%` so it:
  1. Fills its parent.
  2. Allows its child to set a pixel height/width (which will be ignored).

* .bind-inner has `display: table-cell` and `height: 1px` so it:
  1. Has a pixel height/width rule, which makes its derived height the reference height/width
     for all of its decendents %-height/width calculations.
  2. Renders as a table-cell, so it will ignore an arbitrary 1px height/width and fill 100% of
     its parent anyway.
