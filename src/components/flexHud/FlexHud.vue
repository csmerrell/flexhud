<script setup lang="ts">
//Components
import { BoxRebaser, HeightRebaser } from 'coordinate-rebaser'
import Header from './components/Header.vue'
import ContextAnchor from './components/ContextAnchor.vue'
import ContextMenu from './components/ContextMenu.vue'
import SidePane from './components/SidePane.vue'
import SafariPadding from './components/SafariPadding.vue'

//store
import { useFlexHudStore } from './store/flexHud'

//types
import type { FlexHudProps } from './model/FlexHud'
import { computed, onUnmounted } from 'vue'

const props = withDefaults(defineProps<FlexHudProps>(), {
  singleSidePane: undefined
})
const store = useFlexHudStore()

if (Object.values(props).some((prop) => prop !== undefined)) {
  store.initState(props)
}

const collapseMainPane = computed(() => {
  return store.isCompact && (store.leftPaneState.expanded || store.rightPaneState.expanded)
})

const mainPaneToggling = computed(() => {
  return store.isCompact && (store.leftPaneState.toggling || store.rightPaneState.toggling)
})

defineExpose({ store })

const debounceResize = () => {
  store.lastFlexHudResize = Date.now()
  const debounceTimer = 100
  setTimeout(() => {
    if (Date.now() - store.lastFlexHudResize < debounceTimer) return
    store.windowWidth = window.innerWidth
  }, 100)
}

window.addEventListener('resize', debounceResize)

onUnmounted(() => {
  window.removeEventListener('resize', debounceResize)
})
</script>

<template>
  <div class="flex-hud">
    <Header>
      <slot name="header" />
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
        <div
          v-if="$slots['main-pane']"
          id="main-panel"
          :class="{ collapsed: collapseMainPane, toggling: mainPaneToggling }"
        >
          <slot name="main-pane" />
          <SafariPadding />
        </div>
        <div
          v-else
          id="main-panel"
          :class="{ collapsed: collapseMainPane, toggling: mainPaneToggling }"
        >
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

      &.collapsed {
        flex-basis: 0;
      }

      &.toggling {
        transition: flex-basis 1s linear;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    #main-panel,
    .side-pane,
    .side-pane {
      overflow-y: auto;
    }
  }
}
</style>
<style>
:root {
  --fh-compact-break: 640px;
}
</style>
