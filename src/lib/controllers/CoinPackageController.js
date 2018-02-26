import ResourceHelper from '@/lib/helpers/ResourceHelper'

const resourceHelper = new ResourceHelper()

class CoinPackageController {
  constructor (vueContext) {
    this.vueContext = vueContext
  }

  getById (id) {
    return new Promise((resolve, reject) => {
      resourceHelper.get('/api/v1/coin-packages/' + id)
        .then(res => {
          return res.body
        })
        .then(resolve)
        .catch(reject)
    })
  }

  getAll (id) {
    return new Promise((resolve, reject) => {
      resourceHelper.get('/api/v1/coin-packages')
        .then(res => {
          return res.body
        })
        .then(resolve)
        .catch(reject)
    })
  }

  buyCoinPackage (coinPackageId) {
    return new Promise((resolve, reject) => {
      resourceHelper.post('/api/v1/payments-transactions', {coinPackageId})
        .then(res => {
          return res.body
        })
        .then(resolve)
        .catch(reject)
    })
  }
}

export default CoinPackageController
