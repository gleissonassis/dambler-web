import Vue from 'vue'
import UserController from '@/lib/controllers/UserController'
import Logger from '@/lib/Logger'

const logger = new Logger('ResourceHelper')

class ResourceHelper {
  _do (method, url, data) {
    var self = this

    return new Promise((resolve, reject) => {
      let p = null
      this.userController = new UserController()

      const headers = {
        Authorization: 'Bearer ' + self.userController.getCurrentToken()
      }

      logger.debug('Default Headers')
      logger.debug(headers)

      switch (method) {
        case 'get':
          p = Vue.http.get(url, { headers })
          break
        case 'post':
          p = Vue.http.post(url, data, { headers })
          break
        case 'delete':
          p = Vue.http.delete(url, data, { headers })
          break
        case 'put':
          p = Vue.http.put(url, data, { headers })
          break
      }

      p
        .then(res => {
          resolve(res)
        })
        .catch(e => {
          reject(e)
        })
    })
  }

  get (url, data) {
    return this._do('get', url, data)
  }

  post (url, data) {
    return this._do('post', url, data)
  }

  delete (url, data) {
    return this._do('delete', url, data)
  }

  put (url, data) {
    return this._do('put', url, data)
  }
}

export default ResourceHelper
