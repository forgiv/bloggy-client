import React from 'react'
import { shallow } from 'enzyme'

import { Home } from '../Home'

describe('<Home />', () => {
  it('Should render without error', () => {
    shallow(<Home />)
  })
})
