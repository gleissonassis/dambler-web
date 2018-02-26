import ResourceHelper from '@/lib/helpers/ResourceHelper'

const resourceHelper = new ResourceHelper()

class CEPHelper {
  getInfo (cep) {
    return new Promise((resolve, reject) => {
      var newCEP = cep.replace('.', '').replace('-', '')

      resourceHelper.get('/api/v1/cep/' + newCEP)
        .then(res => {
          return res.body
        })
        .then(resolve)
        .catch(reject)
    })
  }
}

export default CEPHelper
