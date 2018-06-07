import React from 'react'
import { shallow, mount } from 'enzyme'

import { NewPost } from '../NewPost'

const props = {
  user: { loading: false, user: { username: 'forgiv' } },
  post: {
    postSuccess: false
  }
}

describe('<NewPost />', () => {
  it('Should render without error', () => {
    shallow(<NewPost {...props} />)
  })

  it('Should render a form with class NewPost', () => {
    const wrapper = shallow(<NewPost {...props} />)
    expect(wrapper.hasClass('NewPost')).toEqual(true)
  })
})
