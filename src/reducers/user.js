import {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR
} from '../actions/user'

const initialState = {
  loading: false,
  error: null,
  user: null
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA_REQUEST:
      return { loading: true }
    case GET_USER_DATA_ERROR:
      return { error: action.error, loading: false }
    case GET_USER_DATA_SUCCESS:
      return { user: action.user, loading: false, error: null }
    default:
      return state
  }
}
