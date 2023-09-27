<script setup lang="ts">
//vue
import { onMounted, ref } from 'vue'

//Components
import { BoxRebaser } from 'coordinate-rebaser'
import Header from './components/Header.vue'
import SidePane from './components/SidePane.vue'
import SafariPadding from './components/SafariPadding.vue'

//store
import { useFlexHud } from './store/flexHud'

//types
import type { FlexHudProps, SidePaneState } from './model/FlexHud'

const props = withDefaults(defineProps<FlexHudProps>(), {
  leftPaneConfig: sidePaneDefaults,
  rightPaneConfig: sidePaneDefaults,
  singleSidePane: true,
  compactBreakPoint: '800px'
})

const store = useFlexHud()
store.initState(props)

const el = ref<HTMLDivElement | null>(null)

defineExpose({ store })

onMounted(() => {
  if (props.leftPaneConfig.width) {
    el.value?.style.setProperty('--fh-left-pane-width', props.leftPaneConfig.width)
  }
  if (props.rightPaneConfig.width) {
    el.value?.style.setProperty('--fh-right-pane-width', props.rightPaneConfig.width)
  }
})
</script>

<script lang="ts">
//defaults
const sidePaneDefaults = () => {
  return { initExpanded: false, width: '40rem' }
}
</script>

<template>
  <div ref="el" class="flex-hud">
    <Header>
      <slot name="header" />
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

    #main-panel {
      flex-grow: 1;
      flex-basis: calc(100% - var(--fh-left-pane-width) - var(--fh-right-pane-width));
    }
    #main-panel,
    .left-pane,
    .right-pane {
      overflow-y: auto;
    }
  }
}
</style>
