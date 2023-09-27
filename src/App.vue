<script setup lang="ts">
/**
 * An applet stub component to test the flex-hud component(s)
 */
import FlexHud from '@/components/flexHud/FlexHud.vue'
import type { FlexHudProps } from './components/flexHud/model/FlexHud'
import { useFlexHud } from './components/flexHud/store/flexHud'

const store = useFlexHud()
</script>

<script lang="ts">
const leftPaneConfig = {
  initExpanded: true,
  width: '23rem'
}

const rightPaneConfig = {
  initExpanded: true,
  width: '18rem'
}
const config: FlexHudProps = {
  leftPaneConfig,
  rightPaneConfig,
  singleSidePane: false
}
</script>

<template>
  <FlexHud ref="hud" class="app" v-bind="config">
    <template #header> <div>Sample Header</div> </template>
    <template #left-pane>
      Sample Left Pane
      <button @click="store.collapseLeftPane">Collapse</button>
    </template>
    <template #main-pane>
      Sample Main Pane
      <button @click="store.toggleLeftPane">Toggle Left Pane</button>
      <button @click="store.toggleRightPane">Toggle Right Pane</button>
    </template>
    <template #right-pane>
      Sample Right Pane
      <button @click="store.collapseRightPane">Collapse</button>
    </template>
  </FlexHud>
</template>

<style scoped lang="scss"></style>

<style lang="scss">
@import './styles/index.scss';

.app {
  .main-header,
  .left-pane {
    background-color: var(--clr-bg-off);
  }

  #main-panel {
    overflow: hidden;
    flex-shrink: 1;
  }

  #main-right-pane,
  #main-left-pane {
    height: 100%;
  }

  &.flex-hud {
    --fh-secondary: var(--clr-pale-gray);
  }
}
</style>
