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
  initExpanded: false,
  width: '23rem'
}

const rightPaneConfig = {
  initExpanded: false,
  width: '18rem'
}
const config: FlexHudProps = {
  leftPaneConfig,
  rightPaneConfig,
  singleSidePane: true
}
</script>

<template>
  <FlexHud ref="hud" class="app" v-bind="config">
    <template #header> <div>Sample Header</div> </template>
    <template #left-pane>
      <div class="left-content">
        Sample Left Pane
        <button @click="store.collapseLeftPane">Collapse</button>
      </div>
    </template>
    <template #main-pane>
      <div class="main-content">
        Sample Main Pane
        <button @click="store.toggleLeftPane">Toggle Left Pane</button>
        <button @click="store.toggleRightPane">Toggle Right Pane</button>
      </div>
    </template>
    <template #right-pane>
      <div class="right-content">
        Sample Right Pane
        <button @click="store.collapseRightPane">Collapse</button>
      </div>
    </template>
  </FlexHud>
</template>

<style scoped lang="scss"></style>

<style lang="scss">
@import './styles/index.scss';

.app {
  .main-content,
  .left-content,
  .right-content {
    padding-bottom: 100rem;
  }
}
</style>
