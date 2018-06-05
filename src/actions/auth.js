import { apiURL } from '../config'
import { getUserData } from './user'

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN'
export const setAuthToken = authToken => ({
  type: SET_AUTH_TOKEN,
  authToken
})

export const AUTH_TOKEN_REQUEST = 'AUTH_TOKEN_REQUEST'
export const authTokenRequest = () => ({
  type: AUTH_TOKEN_REQUEST
})

export const AUTH_TOKEN_SUCCESS = 'AUTH_TOKEN_SUCCESS'
export const authTokenSuccess = (authToken, user) => ({
  type: AUTH_TOKEN_SUCCESS,
  authToken,
  user
})

export const AUTH_TOKEN_ERROR = 'AUTH_TOKEN_ERROR'
export const authTokenError = error => ({
  type: AUTH_TOKEN_ERROR,
  error
})

export const getAuthToken = (username, password) => dispatch => {
  dispatch(authTokenRequest())
  let authToken
  fetch(`${apiURL}/login`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.authToken) {
        authToken = data.authToken
        dispatch(authTokenSuccess(authToken))
        dispatch(getUserData(authToken))
      } else {
        dispatch(authTokenError(data))
      }
    })
    .catch(err => dispatch(authTokenError(err)))
}

export const refreshAuthToken = authToken => dispatch => {
  dispatch(authTokenRequest())
  let newToken
  fetch(`${apiURL}/refresh`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${authToken}`
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.authToken) {
        newToken = data.authToken
        dispatch(authTokenSuccess(newToken))
        dispatch(getUserData(newToken))
      } else {
        dispatch(authTokenError(data))
      }
    })
    .catch(err => dispatch(authTokenError(err)))
}
