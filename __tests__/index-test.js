import React from 'react'
import { shallow } from 'enzyme'
import Truncator from '../src/index'

describe('Truncator', () => {
  let props, wrapper, rerender

  beforeEach(() => {
    props = {
      text: 'hello low',
      extraSpacing: 20,
    }
    rerender = () => {
      wrapper = shallow(
        <Truncator {...props} />
      )
    }
    rerender()
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

  describe('when debugging', () => {
    beforeEach(() => {
      props.debug = true
      rerender()
    })

    it('should keep truncated to false', () => {
      expect(wrapper.state().truncated).toBe(false)
    })
  })
})
