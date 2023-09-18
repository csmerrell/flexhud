import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import WidthRebaser from '../WidthRebaser.vue';

describe('WidthRebaser', () => {
  it('mounts', () => {
    const wrapper = mount(WidthRebaser)
    expect(wrapper).not.toBeNull();
  })
})
