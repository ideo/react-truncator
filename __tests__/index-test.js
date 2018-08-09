import React from 'react'
import { shallow } from 'enzyme'
import Truncator from '../src/index'

describe('Truncator', () => {
  let props, wrapper

  beforeEach(() => {
    props = {
      text: 'hello low',
      extraSpacing: 20,
    }
    wrapper = shallow(
      <Truncator {...props} />
    )
  })

  describe('constructor()', () => {
    it('should set truncated to false and then truncate', () => {
      expect(wrapper.state().truncated).toBe(true)
    })

    it('should set alteredText to the text prop', () => {
      const { text } = props
      expect(wrapper.state().alteredText).toEqual(text)
    })
  })
})
