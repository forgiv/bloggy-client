import {
  AUTH_TOKEN_REQUEST,
  AUTH_TOKEN_SUCCESS,
  AUTH_TOKEN_ERROR
} from '../actions/auth'

const initialState = {
  user: { username: null },
  posts: [],
  authToken: null,
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
        user: { username: action.username },
        loading: false,
        authToken: action.authToken,
        error: null
      }
    case AUTH_TOKEN_ERROR:
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}
