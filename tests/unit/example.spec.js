import { shallowMount } from '@vue/test-utils'
import Home from "../../src/components/Home.vue"

describe('Home', () => {
    it('renders a ', async () => {
    const wrapper = shallowMount(Home)
    expect(wrapper.contains('main')).toBe(true)
  })
})
