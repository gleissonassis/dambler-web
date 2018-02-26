import Logger from '@/lib/Logger'
import ResourceHelper from '@/lib/helpers/ResourceHelper'

const resourceHelper = new ResourceHelper()
const logger = new Logger('AuctionController')

class AuctionController {
  constructor (vueContext) {
    this.vueContext = vueContext
  }

  getById (id) {
    return new Promise((resolve, reject) => {
      resourceHelper.get('/api/v1/auctions/' + id)
        .then(res => {
          return res.body
        })
        .then(resolve)
        .catch(reject)
    })
  }

  getAuctions (type) {
    switch (type.toLowerCase()) {
      case 'open':
        return this.getOpenAuctions()
      case 'online':
        return this.getOnlineAuctions()
      default:
        return this.getAllAuctions()
    }
  }

  getAllAuctions () {
    return new Promise((resolve, reject) => {
      resourceHelper.get('/api/v1/auctions')
        .then(res => res.body)
        .then(resolve)
        .catch(e => {
          reject(e)
        })
    })
  }

  getOpenAuctions () {
    return new Promise((resolve, reject) => {
      logger.info('Getting open auctions from /api/v1/auctions/open')

      resourceHelper.get('/api/v1/auctions/open')
        .then(res => {
          logger.info('Opened auctions returned successfully')
          logger.debug(res.body)

          return res.body
        })
        .then(resolve)
        .catch(e => {
          logger.error('An error has occured while getting opened auctions')
          logger.error(e)

          reject(e)
        })
    })
  }

  getOnlineAuctions () {
    return new Promise((resolve, reject) => {
      logger.info('Getting open auctions from /api/v1/auctions/online')

      resourceHelper.get('/api/v1/auctions/online')
        .then(res => {
          logger.info('Online auctions returned successfully')
          logger.debug(res.body)

          return res.body
        })
        .then(resolve)
        .catch(e => {
          logger.error('An error has occured while getting online auctions')
          logger.error(e)

          reject(e)
        })
    })
  }

  performBid (id) {
    return new Promise((resolve, reject) => {
      logger.info(`Performing a bid to auction ${id} at /api/v1/auctions/${id}/bids`)

      resourceHelper.post('/api/v1/auctions/' + id + '/bids')
        .then(r => {
          logger.info('The bid has been process successfully')
          resolve()
        })
        .catch(e => {
          logger.error('An error has occured while performing a bid')
          logger.error(e)

          reject(e)
        })
    })
  }
}

export default AuctionController
