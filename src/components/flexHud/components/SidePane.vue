<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useFlexHud } from '../store/flexHud'
import type { Store } from 'pinia'
import type { SidePaneState } from '../model/FlexHud'

const props = defineProps<{ side: 'right' | 'left' }>()
const { side } = props

const store = useFlexHud()

const paneState = computed(() => {
  const paneStateKey = `${side}PaneState` as keyof Store
  return store[paneStateKey] as unknown as SidePaneState
})

paneState.value.expanded = Boolean(paneState.value.initExpanded)

if (side === 'right' && store.leftPaneState.expanded) {
  paneState.value.expanded = false
}

const expanded = computed(() => {
  return paneState.value.expanded
})

const el = ref<HTMLElement | null>(null)
const removeToggling = () => {
  paneState.value.toggling = false
  el.value!.removeEventListener('transitionend', removeToggling)
}

const startToggle = () => {
  if (el.value) {
    paneState.value.toggling = true
    el.value.addEventListener('transitionend', removeToggling)
  }
}
watch(expanded, startToggle)
const isCompact = computed(() => store.isCompact)
watch(isCompact, startToggle)
</script>

<template>
  <div
    ref="el"
    class="side-pane"
    :class="{
      [side]: true,
      collapsed: !expanded,
      expanded: expanded,
      toggling: paneState.toggling,
      compact: store.isCompact
    }"
    :style="{
      '--fh-width': paneState.width,
      '--fh-width-transition': paneState.transitionDelay
    }"
  >
    <div ref="contentEl" class="pane-contents">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.side-pane {
  --fh-width-transition: 0.3s;
  --fh-width: 20rem;
  position: relative;
  transition:
    width var(--fh-width-transition) ease-out,
    flex-basis var(--fh-width-transition) ease-out;

  .pane-contents {
    white-space: nowrap;
    height: 100%;
  }

  &.collapsed {
    width: 0;
    flex-basis: 0;
  }

  &.expanded {
    flex-basis: 20rem;
    width: 20rem;
    &.compact {
      flex-basis: 100%;
      width: 100%;
    }
  }

  &.expanded,
  &.toggling {
    border-left: 1px solid var(--fh-secondary);
    box-shadow: 0 0 5px 0.5px var(--fh-secondary);
  }

  &.toggling,
  &.collapsed .pane-contents {
    overflow: hidden;
  }
}
</style>
