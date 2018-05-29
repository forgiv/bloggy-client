import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { authReducer } from './reducers'

export default createStore(authReducer, applyMiddleware(thunk))
