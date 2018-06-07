import React from 'react'
import { shallow } from 'enzyme'

import { Dashboard } from '../Dashboard'

describe('<Dashboard />', () => {
  it('Should render without error', () => {
    shallow(<Dashboard dispatch={() => {}} />)
  })
})
