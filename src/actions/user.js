import { apiURL } from '../config'

export const GET_USER_DATA_REQUEST = 'GET_USER_DATA_REQUEST'
export const getUserDataRequest = () => ({
  type: GET_USER_DATA_REQUEST
})

export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS'
export const getUserDataSuccess = user => ({
  type: GET_USER_DATA_SUCCESS,
  user
})

export const GET_USER_DATA_ERROR = 'GET_USER_DATA_ERROR'
export const getUserDataError = error => ({
  type: GET_USER_DATA_ERROR,
  error
})

export const getUserData = authToken => dispatch => {
  dispatch(getUserDataRequest())
  fetch(`${apiURL}/users`, {
    headers: {
      authorization: `Bearer ${authToken}`
    }
  })
    .then(res => res.json())
    .then(data => {
      if ('id' in data) {
        dispatch(getUserDataSuccess(data))
      } else {
        dispatch(getUserDataError(data.message))
      }
    })
    .catch(err => dispatch(getUserDataError(err.message)))
}
