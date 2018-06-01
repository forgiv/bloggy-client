import {
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_ERROR
} from '../actions/comment'

const initialState = {
  loading: false,
  comments: [],
  error: null
}

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS_REQUEST:
      return { loading: true, error: null, comments: [] }
    case GET_COMMENTS_SUCCESS:
      return { loading: false, comments: action.comments }
    case GET_COMMENTS_ERROR:
      return { loading: false, error: action.error }
    default:
      return state
  }
}

export default commentReducer
