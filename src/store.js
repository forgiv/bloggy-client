import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import { refreshAuthToken, setAuthToken } from './actions/auth'
import { loadAuthToken } from './local-storage'
import { rootReducer } from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const authToken = loadAuthToken()
if (authToken) {
  const token = authToken
  store.dispatch(setAuthToken(token))
  store.dispatch(refreshAuthToken())
}

export default store
