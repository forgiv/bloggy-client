import { getCommentsRequest, getCommentsSuccess, getComments } from './comment'
import { apiURL } from '../config'

const comments = [{ content: 'hello' }]

describe('getComments', () => {
  it('Should dispatch getCommentsSuccess', () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json() {
          return comments
        }
      })
    )

    const username = 'hiram'
    const slug = 'some-slug'
    const dispatch = jest.fn()
    return getComments(username, slug)(dispatch).then(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${apiURL}/comments/${username}/${slug}`
      )
      expect(dispatch).toHaveBeenCalledWith(getCommentsRequest())
      expect(dispatch).toHaveBeenCalledWith(getCommentsSuccess(comments))
    })
  })
})
