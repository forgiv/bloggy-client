import { combineReducers } from 'redux'
import { authReducer } from './auth'
import { postReducer } from './post'
import { userReducer } from './user'
import { CLEAR_STORE } from '../actions/root'

const appReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  user: userReducer
})

export const rootReducer = (state, action) => {
  if (action.type === CLEAR_STORE) {
    state = undefined
  }
  return appReducer(state, action)
}
