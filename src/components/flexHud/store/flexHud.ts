import type { FlexHudProps, SidePaneState } from '../model/FlexHud'
import { defineStore } from 'pinia'

const sidePaneDefaults = {
  expanded: false,
  initExpanded: false,
  transitionDelay: '.3',
  width: '20rem'
}

export const useFlexHud = defineStore('flexHud', {
  state: () => ({
    compactBreakpoint: '800px',
    singleSidePane: true,
    leftPaneState: {
      ...sidePaneDefaults,
      initExpanded: true
    } as SidePaneState,
    rightPaneState: { ...sidePaneDefaults } as SidePaneState
  }),

  getters: {},

  actions: {
    initState(obj: FlexHudProps) {
      const { leftPaneConfig, rightPaneConfig, ...stateObj } = obj
      Object.assign(this, {
        ...stateObj,
        leftPaneState: leftPaneConfig,
        rightPaneState: rightPaneConfig
      })
    },
    setLeftPaneConfig(obj: SidePaneState) {
      Object.assign(this.leftPaneState, obj)
    },
    toggleLeftPane() {
      this.leftPaneState.expanded = !this.leftPaneState.expanded
      if (this.leftPaneState.expanded && this.singleSidePane) {
        this.collapseRightPane()
      }
    },
    collapseLeftPane() {
      this.leftPaneState.expanded = false
    },
    expandLeftPane() {
      this.leftPaneState.expanded = true
      if (this.singleSidePane) {
        this.collapseRightPane()
      }
    },
    setLeftPane(value: boolean) {
      this.leftPaneState.expanded = value
      if (this.leftPaneState.expanded && this.singleSidePane) {
        this.collapseRightPane()
      }
    },
    setRightPaneConfig(obj: SidePaneState) {
      Object.assign(this.rightPaneState, obj)
    },
    toggleRightPane() {
      this.rightPaneState.expanded = !this.rightPaneState.expanded
      if (this.rightPaneState.expanded && this.singleSidePane) {
        this.collapseLeftPane()
      }
    },
    collapseRightPane() {
      this.rightPaneState.expanded = false
    },
    expandRightPane() {
      this.rightPaneState.expanded = true
      if (this.singleSidePane) {
        this.collapseLeftPane()
      }
    },
    setRightPane(value: boolean) {
      this.rightPaneState.expanded = value
      if (this.rightPaneState.expanded && this.singleSidePane) {
        this.collapseLeftPane()
      }
    }
  }
})
