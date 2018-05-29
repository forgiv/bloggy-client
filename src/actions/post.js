import { apiURL } from '../config'

export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST'
export const getPostsRequest = () => ({
  type: GET_POSTS_REQUEST
})

export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
export const getPostsSuccess = posts => ({
  type: GET_POSTS_SUCCESS,
  posts
})

export const GET_POSTS_ERROR = 'GET_POSTS_ERROR'
export const getPostsError = error => ({
  type: GET_POSTS_ERROR,
  error
})

export const getPosts = username => dispatch => {
  fetch(`${apiURL}/users/${username}/posts`)
    .then(res => res.json())
    .then(data => {
      if (!data.message) {
        dispatch(getPostsSuccess(data))
      } else {
        dispatch(getPostsError(data.message))
      }
    })
    .catch(err => dispatch(getPostsError(err.message)))
}
