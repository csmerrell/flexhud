import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BoxRebaser from '../BoxRebaser.vue';

describe('BoxRebaser', () => {
  it('mounts', () => {
    const wrapper = mount(BoxRebaser)
    expect(wrapper).not.toBeNull();
  })
})
