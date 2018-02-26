import jwtDecode from 'jwt-decode'
import EventBus from '@/lib/EventBus'
import ResourceHelper from '@/lib/helpers/ResourceHelper'
import Logger from '@/lib/Logger'

const logger = new Logger('UserController')
const resourceHelper = new ResourceHelper()

class UserController {
  constructor (vueContext) {
    this.vueContext = vueContext
  }

  createUser (user) {
    const self = this
    return new Promise((resolve, reject) => {
      resourceHelper.post('/api/v1/users', user)
        .then(res => {
          return self.registerUserFromResponse(res)
        })
        .then(resolve)
        .catch(reject)
    })
  }

  confirmUser (userId, confirmationKey) {
    return new Promise((resolve, reject) => {
      resourceHelper.post(`/api/v1/users/${userId}/confirm/${confirmationKey}`)
        .then(res => res.body)
        .then(resolve)
        .catch(reject)
    })
  }

  updateCurrentUser (user) {
    var self = this

    return new Promise((resolve, reject) => {
      resourceHelper.put('/api/v1/users/me', user)
        .then(res => {
          return self.registerUserFromResponse(res)
        })
        .then(resolve)
        .catch(reject)
    })
  }

  getCurrentUserFromServer (user) {
    var self = this

    return new Promise((resolve, reject) => {
      resourceHelper.get('/api/v1/users/me')
        .then(res => {
          return self.registerUserFromResponse(res)
        })
        .then(resolve)
        .catch(error => {
          if (error.status === 403) {
            self.logout()
          }
          reject(error)
        })
    })
  }

  resetPassword (userId, key, newPassword) {
    return new Promise((resolve, reject) => {
      resourceHelper.post(`/api/v1/users/${userId}/reset-password/${key}`, {newPassword})
        .then(res => res.body)
        .then(resolve)
        .catch(reject)
    })
  }

  login (email, password) {
    const self = this

    return new Promise((resolve, reject) => {
      resourceHelper.post('/api/v1/users/auth', {email, password})
        .then(res => {
          const user = res.body
          localStorage.setItem('currentUserToken', user.token)

          return self.registerUserFromResponse(res)
        })
        .then(resolve)
        .catch(reject)
    })
  }

  updateToken () {
    const self = this

    return new Promise((resolve, reject) => {
      resourceHelper.post('/api/v1/users/auth/tokens')
        .then(res => {
          const user = res.body
          localStorage.setItem('currentUserToken', user.token)

          return self.registerUserFromResponse(res)
        })
        .then(resolve)
        .catch(reject)
    })
  }

  registerUserFromResponse (response) {
    var user = response.body

    // sending to the app the new user
    EventBus.$emit('new-user', user)

    return user
  }

  logout () {
    logger.info('Removing the current user token')

    localStorage.removeItem('currentUserToken')
    EventBus.$emit('new-user', null)
  }

  getCurrentUser () {
    logger.info('Trying to get user information')
    const token = localStorage.getItem('currentUserToken')
    logger.debug(token)

    if (token) {
      try {
        const user = jwtDecode(token)

        logger.info('A valid token was found')
        logger.debug(user)
        return jwtDecode(token)
      } catch (e) {
        logger.warn('The current token is invalid')
        return null
      }
    } else {
      return null
    }
  }

  getCurrentToken () {
    return localStorage.getItem('currentUserToken')
  }
}

export default UserController
