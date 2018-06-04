import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers'
import { setAuthToken } from './actions/auth'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

if (localStorage.getItem('authToken')) {
  store.dispatch(setAuthToken(localStorage.getItem('authToken')))
}

export default store
