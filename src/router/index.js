import Vue from 'vue'
import Router from 'vue-router'

import Base from './BaseRoutes'
import Auctions from './AuctionsRoutes'
import Users from './UsersRoutes'
import CoinPackagesRoutes from './CoinPackagesRoutes'

var config = {
  routes: []
}

config.routes = config.routes.concat(Base.routes)
config.routes = config.routes.concat(Auctions.routes)
config.routes = config.routes.concat(Users.routes)
config.routes = config.routes.concat(CoinPackagesRoutes.routes)

Vue.use(Router)

export default new Router(config)
