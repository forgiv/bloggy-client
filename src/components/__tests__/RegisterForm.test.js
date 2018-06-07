import React from 'react'
import { shallow } from 'enzyme'

import { RegisterForm } from '../RegisterForm'

describe(<RegisterForm />, () => {
  it('Should mount without error', () => {
    shallow(<RegisterForm handleSubmit={() => {}} />)
  })

  it('Should render a form with class RegisterForm', () => {
    const wrapper = shallow(<RegisterForm handleSubmit={() => {}} />)
    console.log(wrapper.debug())
    expect(wrapper.hasClass('RegisterForm')).toEqual(true)
  })

  it('Should call handleSubmit onSubmit', () => {
    const spy = jest.fn()
    const wrapper = shallow(<RegisterForm handleSubmit={spy} />)
    wrapper.simulate('submit')
    expect(spy).toHaveBeenCalled()
  })
})
