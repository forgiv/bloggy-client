import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR
} from '../actions/post'

const initialState = {
  posts: [],
  loading: false,
  error: null
}

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return { ...state, loading: true, error: null }
    case GET_POSTS_SUCCESS:
      return { ...state, loading: false, posts: action.posts }
    case GET_POSTS_ERROR:
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}
