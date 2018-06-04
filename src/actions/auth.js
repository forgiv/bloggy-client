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
        dispatch(getUserData(authToken))
        dispatch(authTokenSuccess(authToken))
      } else {
        dispatch(authTokenError(data))
      }
    })
    .catch(err => dispatch(authTokenError(err)))
}

export const refreshAuthToken = authToken => dispatch => {
  dispatch(authTokenRequest())
  let authToken
  fetch(`${apiURL}/refresh`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${authToken}`
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.authToken) {
        authToken = data.authToken
        return fetch(`${apiURL}/users`, {
          headers: {
            authorization: `Bearer ${authToken}`
          }
        })
      } else {
        dispatch(authTokenError(data))
      }
    })
    .then(res => res.json())
    .then(user => dispatch(authTokenSuccess(authToken, user)))
    .catch(err => dispatch(authTokenError(err)))
}
