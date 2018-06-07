import React from 'react'
import { shallow } from 'enzyme'

import { LoginForm } from '../LoginForm'

describe('<LoginForm />', () => {
  it('Should render without error', () => {
    shallow(<LoginForm />)
  })

  it('Should render a form with class of LoginForm', () => {
    const wrapper = shallow(<LoginForm />)
    expect(wrapper.hasClass('LoginForm')).toEqual(true)
  })
})
