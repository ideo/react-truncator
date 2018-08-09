import React from 'react'
import { shallow } from 'enzyme'
import Truncator from '../src/index'

describe('Truncator', () => {
  let pros, wrapper

  beforeEach(() => {
    pros = {
      text: 'hello low',
      extraSpacing: 20,
    }
    wrapper = shallow(
      <Truncator {...pros} />
    )
  })

  describe('constructor()', () => {
    it('should set truncated to false and then truncate', () => {
      expect(wrapper.state().truncated).toBe(true)
    })

    it('should set alteredText to the text prop', () => {
      expect(wrapper.state().alteredText).toEqual(pros.text)
    })
  })
})
