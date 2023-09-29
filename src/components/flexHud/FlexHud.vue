<script setup lang="ts">
//Components
import { BoxRebaser, HeightRebaser } from 'coordinate-rebaser'
import Header from './components/Header.vue'
import SidePane from './components/SidePane.vue'
import SafariPadding from './components/SafariPadding.vue'

//store
import { useFlexHud } from './store/flexHud'

//types
import type { FlexHudProps } from './model/FlexHud'

const props = withDefaults(defineProps<FlexHudProps>(), {
  singleSidePane: undefined
})
const store = useFlexHud()

if (Object.values(props).some((prop) => prop !== undefined)) {
  debugger
  store.initState(props)
}

defineExpose({ store })
</script>

<template>
  <div
    class="flex-hud"
    :style="{
      '--fh-compact-break': `${store.compactBreakpoint}px`
    }"
  >
    <Header>
      <div>
        <slot name="header" />
      </div>
      <div v-if="$slots['context-menu']">
        <HeightRebaser>
          <ContextAnchor v-if="$slots['context-anchor']">
            <slot name="context-anchor" />
          </ContextAnchor>
          <div v-else class="default-anchor"></div>
          <ContextMenu>
            <slot name="context-menu" />
          </ContextMenu>
        </HeightRebaser>
      </div>
    </Header>
    <BoxRebaser>
      <div class="hud-body">
        <SidePane v-if="$slots['left-pane']" side="left">
          <slot name="left-pane" />
          <SafariPadding />
        </SidePane>
        <div v-if="$slots['main-pane']" id="main-panel">
          <slot name="main-pane" />
          <SafariPadding />
        </div>
        <div v-else id="main-panel">
          <slot />
          <SafariPadding />
        </div>
        <SidePane v-if="$slots['right-pane']" side="right">
          <slot name="right-pane" />
          <SafariPadding />
        </SidePane>
      </div>
    </BoxRebaser>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  overflow: hidden;
}
.flex-hud {
  --fh-bg: #fff;
  --fh-secondary: #666;

  height: 100vh;
  width: 100vw;

  display: flex;
  flex-flow: column;

  .hud-body {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-flow: row;
    overflow: hidden;

    #main-panel {
      flex-grow: 1;
      flex-basis: calc(100% - var(--fh-left-pane-width) - var(--fh-right-pane-width));
    }

    #main-panel,
    .side-pane,
    .side-pane {
      overflow-y: auto;
    }
  }
}
</style>
