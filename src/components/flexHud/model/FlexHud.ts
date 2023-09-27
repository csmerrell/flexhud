export type SidePaneProps = {
  initExpanded?: boolean
  transitionDelay: string
  width: string
}

export type SidePaneState = SidePaneProps & {
  expanded: boolean
  toggling: boolean
}

type FlexHudPropsBase = {
  compactBreakPoint?: string
  singleSidePane?: boolean
}

export type FlexHudProps = FlexHudPropsBase & {
  leftPaneConfig?: Partial<SidePaneProps>
  rightPaneConfig?: Partial<SidePaneProps>
}

export type FlexHudState = FlexHudPropsBase & {
  [key: string]: SidePaneState | undefined
  leftPaneState?: SidePaneState
  rightPaneState?: SidePaneState
}
