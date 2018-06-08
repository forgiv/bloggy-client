import {
  authTokenRequest,
  authTokenSuccess,
  getAuthToken,
  refreshAuthToken
} from './auth'
import { apiURL } from '../config'

const user = { username: 'user', password: 'password' }
const token = 'hiram'

describe('getAuthToken', () => {
  it('Should dispatch authTokenSuccess', () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json() {
          return { authToken: token }
        }
      })
    })

    const dispatch = jest.fn()
    return getAuthToken(user.username, user.password)(dispatch).then(() => {
      expect(fetch).toHaveBeenCalledWith(`${apiURL}/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      expect(dispatch).toHaveBeenCalledWith(authTokenRequest())
      expect(dispatch).toHaveBeenCalledWith(authTokenSuccess(token))
    })
  })
})

describe('refreshAuthToken', () => {
  it('Should dispatch authTokenSuccess', () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json() {
          return { authToken: token }
        }
      })
    })

    const dispatch = jest.fn()
    return refreshAuthToken('oldToken')(dispatch).then(() => {
      expect(fetch).toHaveBeenCalledWith(`${apiURL}/refresh`, {
        method: 'POST',
        headers: {
          authorization: `Bearer oldToken`
        }
      })
      expect(dispatch).toHaveBeenCalledWith(authTokenSuccess(token))
    })
  })
})
