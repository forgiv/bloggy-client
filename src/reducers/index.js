import { combineReducers } from 'redux'
import { authReducer } from './auth'
import { postReducer } from './post'
import { userReducer } from './user'
import { CLEAR_STORE } from '../actions/root'
import { reducer as formReducer } from 'redux-form'

const appReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  user: userReducer,
  form: formReducer
})

export const rootReducer = (state, action) => {
  if (action.type === CLEAR_STORE) {
    state = undefined
  }
  return appReducer(state, action)
}
