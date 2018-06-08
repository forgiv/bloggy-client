import { apiURL } from '../config'

export const GET_COMMENTS_REQUEST = 'GET_COMMENTS_REQUEST'
export const getCommentsRequest = () => ({
  type: GET_COMMENTS_REQUEST
})

export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS'
export const getCommentsSuccess = comments => ({
  type: GET_COMMENTS_SUCCESS,
  comments
})

export const GET_COMMENTS_ERROR = 'GET_COMMENTS_ERROR'
export const getCommentsError = error => ({
  type: GET_COMMENTS_ERROR,
  error
})

export const getComments = (username, slug) => dispatch => {
  dispatch(getCommentsRequest())
  return fetch(`${apiURL}/comments/${username}/${slug}`)
    .then(res => {
      if (!res.ok) {
        return Promise.reject({ code: res.status, message: res.statusText })
      }
      return res.json()
    })
    .then(comments => dispatch(getCommentsSuccess(comments)))
    .catch(err => dispatch(getCommentsError(err)))
}
