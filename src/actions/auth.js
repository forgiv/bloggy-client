import { apiURL } from '../config'

export const AUTH_TOKEN_REQUEST = 'AUTH_TOKEN_REQUEST'
export const authTokenRequest = () => ({
  type: AUTH_TOKEN_REQUEST
})

export const AUTH_TOKEN_SUCCESS = 'AUTH_TOKEN_SUCCESS'
export const authTokenSuccess = (authToken, username) => ({
  type: AUTH_TOKEN_SUCCESS,
  authToken,
  username
})

export const AUTH_TOKEN_ERROR = 'AUTH_TOKEN_ERROR'
export const authTokenError = error => ({
  type: AUTH_TOKEN_ERROR,
  error
})

export const getAuthToken = (username, password) => dispatch => {
  dispatch(authTokenRequest())
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
        dispatch(authTokenSuccess(data.authToken, username))
      } else {
        dispatch(authTokenError(data))
      }
    })
    .catch(err => dispatch(authTokenError(err)))
}

export const refreshAuthToken = authToken => dispatch => {
  dispatch(authTokenRequest())
  fetch(`${apiURL}/refresh`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${authToken}`
    }
  })
    .then(res => res.json())
    .then(data => {
      if (data.authToken) {
        dispatch(authTokenSuccess(data.authToken))
      } else {
        dispatch(authTokenError(data))
      }
    })
    .catch(err => dispatch(authTokenError(err)))
}
