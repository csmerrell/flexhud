<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
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

const expanded = computed(() => {
  return paneState.value.expanded
})

const removeToggling = () => {
  paneState.value.toggling = false
  el.value!.removeEventListener('transitionend', removeToggling)
}

watch(expanded, () => {
  if (el.value) {
    paneState.value.toggling = true
    el.value.addEventListener('transitionend', removeToggling)
  }
})

//mounted
const el = ref<HTMLElement | null>(null)
onMounted(() => {
  if (paneState.value.width) {
    el.value?.style.setProperty('--fh-width', paneState.value.width)
  }
  if (paneState.value.transitionDelay) {
    el.value?.style.setProperty('--fh-width-transition', paneState.value.transitionDelay)
  }
})
</script>

<template>
  <div
    ref="el"
    :class="{
      [side]: true,
      collapsed: !expanded,
      expanded: expanded,
      toggling: paneState.toggling
    }"
    class="side-pane"
  >
    <div ref="contentEl" class="pane-contents">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.side-pane {
  --fh-width-transition: 0.5s;
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
    flex-basis: var(--fh-width);
    width: var(--fh-width);
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
