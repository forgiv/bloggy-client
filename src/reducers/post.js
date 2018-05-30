import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  NEW_POST_REQUEST,
  NEW_POST_SUCCESS,
  NEW_POST_ERROR,
  POST_CLEAR,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_ERROR
} from '../actions/post'

const initialState = {
  posts: [],
  loading: false,
  error: null,
  success: false
}

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return { posts: [], loading: true, error: null, success: false }
    case GET_POSTS_SUCCESS:
      return { ...state, loading: false, posts: action.posts, success: true }
    case GET_POSTS_ERROR:
      return { ...state, loading: false, error: action.error }
    case NEW_POST_REQUEST:
      return { ...state, loading: true, error: null, success: false }
    case NEW_POST_SUCCESS:
      return { ...state, loading: false, success: true }
    case NEW_POST_ERROR:
      return { ...state, loading: false, error: action.error }
    case GET_POST_REQUEST:
      return { ...state, loading: true, error: null, success: false }
    case GET_POST_SUCCESS:
      return { ...state, posts: [action.post], loading: false, success: true }
    case GET_POST_ERROR:
      return { ...state, loading: false, error: action.error }
    case POST_CLEAR:
      return { ...state, success: false }
    default:
      return state
  }
}
