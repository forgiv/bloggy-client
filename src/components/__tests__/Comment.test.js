import React from 'react'
import { shallow } from 'enzyme'

import { Comment } from '../Comment'

describe('<Comment />', () => {
  it('Should render without error', () => {
    shallow(<Comment />)
  })
})
