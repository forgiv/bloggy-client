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

export const GET_POST_REQUEST = 'GET_POST_REQUEST'
export const getPostRequest = () => ({
  type: GET_POST_REQUEST
})

export const GET_POST_SUCCESS = 'GET_POST_SUCCESS'
export const getPostSuccess = post => ({
  type: GET_POST_SUCCESS,
  post
})

export const GET_POST_ERROR = 'GET_POST_ERROR'
export const getPostError = error => ({
  type: GET_POST_ERROR,
  error
})

export const POST_CLEAR = 'POST_CLEAR'
export const postClear = () => ({
  type: POST_CLEAR
})

export const getPosts = username => dispatch => {
  dispatch(getPostsRequest())
  return fetch(`${apiURL}/users/${username}/posts`)
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
  return fetch(`${apiURL}/posts`, {
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

export const getPost = (username, slug) => dispatch => {
  dispatch(getPostRequest())
  return fetch(`${apiURL}/users/${username}/${slug}`)
    .then(res => {
      if (res.status === 200) {
        return res.json()
      } else {
        dispatch(getPostError(res.statusText))
      }
    })
    .then(post => dispatch(getPostSuccess(post)))
    .catch(err => dispatch(getPostError(err)))
}
