import Enzyme, { shallow, render, mount } from 'enzyme'
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'

// provide React globally in tests without having to "import"
global.React = React
global.shallow = shallow
global.render = render
global.mount = mount

Enzyme.configure({ adapter: new Adapter() })
