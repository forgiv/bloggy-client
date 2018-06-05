import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers'
import { refreshAuthToken } from './actions/auth'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const authToken = localStorage.getItem('authToken')
if (authToken) {
  store.dispatch(refreshAuthToken(authToken))
}

export default store
