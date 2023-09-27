<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useFlexHud } from '../store/flexHud'

const store = useFlexHud()
store.setRightPane(Boolean(store.rightPaneState.initExpanded))

const expanded = computed(() => {
  return store.rightPaneState.expanded
})

const removeToggling = () => {
  store.rightPaneState.toggling = false
  el.value!.removeEventListener('transitionend', removeToggling)
}

watch(expanded, () => {
  if (el.value) {
    store.rightPaneState.toggling = true
    el.value.addEventListener('transitionend', removeToggling)
  }
})

//mounted
const el = ref<HTMLElement | null>(null)
onMounted(() => {
  if (store.rightPaneState.width) {
    el.value?.style.setProperty('--fh-right-pane-width', store.rightPaneState.width)
  }
  if (store.rightPaneState.transitionDelay) {
    el.value?.style.setProperty('--fh-width-transition', store.rightPaneState.transitionDelay)
  }
})
</script>

<template>
  <div
    ref="el"
    :class="{
      collapsed: !store.rightPaneState.expanded,
      expanded: store.rightPaneState.expanded,
      toggling: store.rightPaneState.toggling
    }"
    class="right-pane"
  >
    <div ref="contentEl" class="pane-contents">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.right-pane {
  --fh-width-transition: 0.5s;
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
    .pane-contents {
      overflow: hidden;
    }
  }

  &.expanded {
    flex-basis: var(--fh-right-pane-width);
    width: var(--fh-right-pane-width);
  }

  &.expanded,
  &.toggling {
    border-left: 1px solid var(--fh-secondary);
    box-shadow: 0 0 5px 0.5px var(--fh-secondary);
  }
}
</style>
