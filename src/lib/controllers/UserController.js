import Vue from 'vue'

class UserController {
  createUser (user) {
    return new Promise((resolve, reject) => {
      Vue.http.post('/api/v1/users', user)
        .then(resolve)
        .catch(reject)
    })
  }

  login (email, password) {
    return new Promise((resolve, reject) => {
      Vue.http.post('/api/v1/users/auth', {email, password})
        .then(user => {
          localStorage.setItem('currentUser', user.token)
          Vue.http.headers.common['Authorization'] = 'Bearer ' + user.token
          resolve(user)
        })
        .catch(reject)
    })
  }

  logout () {
    localStorage.setItem('currentUser', null)
  }
}

export default UserController
