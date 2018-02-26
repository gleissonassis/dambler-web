<template>
  <!-- eslint-disable -->
  <header class="main-header">
    <a href="index2.html" class="logo">
      <span class="logo-mini"><img src="/static/images/mpt.png" class="img-fluid" alt="logo" /></span>
      <span class="logo-lg"><b>mínimo</b>Admin</span>
    </a>
    <nav class="navbar navbar-static-top top-navbar navbar-expand-md">
      <a href="#" class="sidebar-toggle d-block d-lg-none" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <ul class="navbar-nav mr-auto mt-md-0">
      </ul>
      <div class="navbar-custom-menu">
        <ul v-if="user && user.wallet" class="nav navbar-nav">
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img src="/static/images/ninja-user3.png" class="user-image rounded-circle" alt="User Image">
              <span class="d-none d-sm-inline-block">{{ user.name }}</span>
            </a>
            <ul class="dropdown-menu scale-up">
              <li class="user-header" style="height: auto !important">
                <p>
                  {{ user.name }}
                  <small>{{ user.email }}</small>
                </p>
              </li>
              <!-- Menu Body -->
              <li class="user-body">
                <div class="row">
                  <div class="col text-center">
                    <a href="#">Leilões</a>
                  </div>
                  <div class="col text-center">
                    <a href="#">Compras</a>
                  </div>
                  <div class="col text-center">
                    <a href="#">Ajuda</a>
                  </div>
                </div>
              </li>
              <div class="user-footer">
                <div class="pull-left">
                  <router-link to="/users/me" class="btn btn-default btn-flat btn-user-option">Minha Conta</router-link>
                </div>
                <div class="pull-right">
                  <router-link to="/logout" class="btn btn-default btn-flat btn-user-option">Sair</router-link>
                </div>
              </div>
            </ul>
          </li>
          <li class="dropdown messages-menu">
            <a href="#" class="dropdown-toggle coins" data-toggle="dropdown">
              <img src="/static/images/coins.png" style="wdith: 30px; height: 30px" class="user-image rounded-circle" alt="User Image">
              <span>{{ user.wallet.coins}}</span>
            </a>
            <ul class="dropdown-menu scale-up">
              <li v-if="user.wallet.coins > 5" class="header">Você tem {{ user.wallet.coins }} moedas!</li>
              <li v-if="user.wallet.coins <= 5 && user.wallet.coins > 0" class="header">Você tem {{ user.wallet.coins }} moedas! Elas estão acabando!</li>
              <li v-if="user.wallet.coins <= 0" class="header">Suas moedas acabaram :(</li>
              <li>
                <ul class="menu inner-content-div">
                  <li v-for="coinPackage in this.coinPackages" :key="coinPackage.id">
                    <router-link :to="'/coin-packages/' + coinPackage.id" :title="coinPackage.description">
                      <div class="pull-left">
                        <img src="/static/images/coins.png" class="rounded-circle">
                      </div>
                      <div class="mail-contnet">
                         <h4>
                          {{ coinPackage.coins}} moedas
                          <small><i class="fa fa-money"></i> {{ coinPackage.price | currency}}</small>
                         </h4>
                         <span>{{ coinPackage.hint }}</span>
                      </div>
                    </router-link>
                  </li>
                </ul>
              </li>
              <li class="footer"><router-link to="/buy">Veja todas as opções</router-link></li>
            </ul>
          </li>
          <!-- Notifications: style can be found in dropdown.less -->
          <li class="dropdown notifications-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <i class="fa fa-bell"></i>
              <span class="label label-warning">7</span>
            </a>
            <ul class="dropdown-menu scale-up">
              <li class="header">You have 7 notifications</li>
              <li>
                <!-- inner menu: contains the actual data -->
                <ul class="menu inner-content-div">
                  <li>
                    <a href="#">
                      <i class="fa fa-users text-aqua"></i> Curabitur id eros quis nunc suscipit blandit.
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-warning text-yellow"></i> Duis malesuada justo eu sapien elementum, in semper diam posuere.
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-users text-red"></i> Donec at nisi sit amet tortor commodo porttitor pretium a erat.
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-shopping-cart text-green"></i> In gravida mauris et nisi
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-user text-red"></i> Praesent eu lacus in libero dictum fermentum.
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-user text-red"></i> Nunc fringilla lorem
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i class="fa fa-user text-red"></i> Nullam euismod dolor ut quam interdum, at scelerisque ipsum imperdiet.
                    </a>
                  </li>
                </ul>
              </li>
              <li class="footer"><a href="#">View all</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import UserController from '@/lib/controllers/UserController'
import CoinPackageController from '@/lib/controllers/CoinPackageController'
import Thread from '@/lib/Thread'
import EventBus from '@/lib/EventBus'

export default {
  data () {
    return {
      user: null,
      coinPackages: []
    }
  },

  mounted () {
    const self = this

    EventBus.$on('bid', eventArgs => {
      if (!eventArgs.isBiding) {
        self.loadCurrentUser()
      }
    })

    self.loadCurrentUser()
      .then(() => {
        self.currentUserUpdater = new Thread('currentUserUpdater', 1000 * 5, () => {
          self.loadCurrentUser()
        })

        self.currentUserUpdater.start()
      })
  },

  destroyed () {
    if (self.currentUserUpdater) {
      self.currentUserUpdater.stop()
    }
  },

  methods: {
    loadCurrentUser () {
      const self = this

      return new Promise((resolve, reject) => {
        var userController = new UserController(self)

        if (userController.getCurrentUser() != null) {
          userController.getCurrentUserFromServer()
            .then(user => {
              self.user = user

              // if there is a logged user the coins package will be listed
              self.loadCoinPackages()
              return user
            })
            .then(resolve)
            .catch(reject)
        }
      })
    },

    loadCoinPackages () {
      const self = this
      return new Promise((resolve, reject) => {
        var coinPackageController = new CoinPackageController(self)

        coinPackageController.getAll()
          .then(coinPackages => {
            self.coinPackages = coinPackages
            return coinPackages
          })
          .then(resolve)
          .catch(reject)
      })
    }
  }
}
</script>

<style scoped>
.btn-user-option {
  width: 120px
}
</style>
