import { combineReducers } from 'redux'
import { authReducer } from './auth'
import { postReducer } from './post'
import { userReducer } from './user'
import { CLEAR_STORE } from '../actions/root'
import { reducer as formReducer } from 'redux-form'
import commentReducer from './comment'
import setAuthToken from '../actions/auth'

const appReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  user: userReducer,
  comment: commentReducer,
  form: formReducer
})

export const rootReducer = (state, action) => {
  if (action.type === CLEAR_STORE) {
    state = undefined
  }
  return appReducer(state, action)
}
