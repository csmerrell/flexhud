import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import HeightRebaser from '../HeightRebaser.vue';

describe('HeightRebaser', () => {
  it('mounts', () => {
    const wrapper = mount(HeightRebaser)
    expect(wrapper).not.toBeNull();
  })
})
