import {
  AUTH_TOKEN_REQUEST,
  AUTH_TOKEN_SUCCESS,
  AUTH_TOKEN_ERROR
} from '../actions/auth'

const initialState = {
  authToken: localStorage.getItem('authToken'),
  loading: false,
  error: null
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TOKEN_REQUEST:
      return { ...state, loading: true, error: null }
    case AUTH_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        authToken: action.authToken
      }
    case AUTH_TOKEN_ERROR:
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}
