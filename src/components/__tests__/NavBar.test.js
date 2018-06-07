import React from 'react'
import { shallow } from 'enzyme'

import { NavBar } from '../NavBar'

describe('<NavBar />', () => {
  it('Should render without errors', () => {
    shallow(<NavBar />)
  })
})
