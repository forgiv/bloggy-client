import { combineReducers } from 'redux'
import { authReducer } from './auth'
import { postReducer } from './post'
import { userReducer } from './user'

export const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  user: userReducer
})
