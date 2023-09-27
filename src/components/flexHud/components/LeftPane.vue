<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useFlexHud } from '../store/flexHud'

const store = useFlexHud()
store.setLeftPane(Boolean(store.leftPaneState.initExpanded))

//mounted
const el = ref<HTMLElement | null>(null)
onMounted(() => {
  if (store.leftPaneState.transitionDelay) {
    el.value?.style.setProperty('--fh-width-transition', store.leftPaneState.transitionDelay)
  }
})
</script>

<template>
  <div
    ref="el"
    :class="{
      collapsed: !store.leftPaneState.expanded,
      expanded: store.leftPaneState.expanded,
      toggling: toggling
    }"
    class="left-pane"
  >
    <div ref="contentEl" class="pane-contents">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.left-pane {
  --fh-width-transition: 0.5s;
  position: relative;
  transition:
    width var(--fh-width-transition) ease-out,
    flex-basis var(--fh-width-transition) ease-out;

  .pane-contents {
    white-space: nowrap;
    height: 100%;
    width: 100%;
  }

  &.collapsed {
    width: 0;
    flex-basis: 0;
    .pane-contents {
      overflow: hidden;
    }
  }

  &.expanded {
    flex-basis: var(--fh-left-pane-width);
    width: var(--fh-left-pane-width);
  }

  &.expanded,
  &.toggling {
    border-right: 1px solid var(--fh-secondary);
    box-shadow: 0 0 5px 0.5px var(--fh-secondary);
  }
}
</style>
