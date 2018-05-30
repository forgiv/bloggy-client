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

export const NEW_POST_REQUEST = 'NEW_POST_REQUEST'
export const newPostRequest = () => ({
  type: NEW_POST_REQUEST
})

export const NEW_POST_SUCCESS = 'NEW_POST_SUCCESS'
export const newPostSuccess = () => ({
  type: NEW_POST_SUCCESS
})

export const NEW_POST_ERROR = 'NEW_POST_ERROR'
export const newPostError = error => ({
  type: NEW_POST_ERROR,
  error
})

export const getPosts = username => dispatch => {
  dispatch(getPostsRequest())
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

export const newPost = (postData, authToken) => dispatch => {
  dispatch(newPostRequest())
  fetch(`${apiURL}/posts`, {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${authToken}`
    }
  })
    .then(res => {
      if (res.status === 201) dispatch(newPostSuccess())
      else return res.json()
    })
    .then(err => dispatch(newPostError(err)))
    .catch(err => dispatch(newPostError(err)))
}
