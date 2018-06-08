import { getUserData, getUserDataRequest, getUserDataSuccess } from './user'
import { apiURL } from '../config'

describe('getUserData', () => {
  it('Should dispatch getUserDataSuccess', () => {
    const user = { username: 'hiram', id: '12345678910' }

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json() {
          return user
        }
      })
    )

    const authToken = 'hiramisawesome'
    const dispatch = jest.fn()
    return getUserData(authToken)(dispatch).then(() => {
      expect(fetch).toHaveBeenCalledWith(`${apiURL}/users`, {
        headers: { authorization: 'Bearer hiramisawesome' }
      })
      expect(dispatch).toHaveBeenCalledWith(getUserDataRequest())
      expect(dispatch).toHaveBeenCalledWith(getUserDataSuccess(user))
    })
  })
})
