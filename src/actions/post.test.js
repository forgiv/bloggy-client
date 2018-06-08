import {
  getPosts,
  getPostsRequest,
  getPostsSuccess,
  newPost,
  newPostRequest,
  newPostSuccess,
  getPost,
  getPostRequest,
  getPostSuccess
} from './post'
import { apiURL } from '../config'

const user = { username: 'hiram', id: '12345678910' }
const post = { title: 'something', content: 'something' }

describe('getPosts', () => {
  it('Should dispatch getPostsSuccess', () => {
    const posts = [post]

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json() {
          return posts
        }
      })
    )

    const dispatch = jest.fn()
    return getPosts(user.username)(dispatch).then(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${apiURL}/users/${user.username}/posts`
      )
      expect(dispatch).toHaveBeenCalledWith(getPostsRequest())
      expect(dispatch).toHaveBeenCalledWith(getPostsSuccess(posts))
    })
  })
})

describe('newPost', () => {
  it('Should dispatch newPostSuccess', () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        status: 201
      })
    })

    const authToken = 'hiram'
    const dispatch = jest.fn()
    return newPost(post, authToken)(dispatch).then(() => {
      expect(fetch).toHaveBeenCalledWith(`${apiURL}/posts`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(post)
      })
      expect(dispatch).toHaveBeenCalledWith(newPostRequest())
      expect(dispatch).toHaveBeenCalledWith(newPostSuccess())
    })
  })
})

describe('getPost', () => {
  it('Should dispatch getPostSuccess', () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        status: 200,
        json() {
          return post
        }
      })
    })

    const slug = 'some-slug'
    const dispatch = jest.fn()
    return getPost(user.username, slug)(dispatch).then(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${apiURL}/users/${user.username}/${slug}`
      )
      expect(dispatch).toHaveBeenCalledWith(getPostRequest())
      expect(dispatch).toHaveBeenCalledWith(getPostSuccess(post))
    })
  })
})
