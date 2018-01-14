import Vue from 'vue'

class UserController {
  createUser (user) {
    return new Promise((resolve, reject) => {
      Vue.http.post('/api/v1/users', user)
        .then(resolve)
        .catch(reject)
    })
  }
}

export default UserController
