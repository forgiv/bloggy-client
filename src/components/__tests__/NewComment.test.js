import React from 'react'
import { shallow } from 'enzyme'

import { NewComment } from '../NewComment'

describe('<NewComment />', () => {
  it('Should render without error', () => {
    shallow(<NewComment />)
  })

  it('Should render an empty div if authToken does not exist', () => {
    const wrapper = shallow(<NewComment />)
    expect(wrapper.html()).toEqual('<div></div>')
  })

  it('Should render a form with class NewComment if authToken exists', () => {
    const wrapper = shallow(<NewComment authToken="token" />)
    expect(wrapper.hasClass('NewComment')).toEqual(true)
  })
})
