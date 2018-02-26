<template>
  <div class="wrapper">
    <header-component/>
    <navbar />
    <div class="content-wrapper">
      <router-view />
    </div>
    <footer-component />
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header'
import Navbar from '@/components/Navbar'
import FooterComponent from '@/components/Footer'
import UserController from '@/lib/controllers/UserController'
import Logger from '@/lib/Logger'
import Thread from '@/lib/Thread'

const logger = new Logger('Master')

export default {
  components: {
    HeaderComponent,
    Navbar,
    FooterComponent
  },

  created () {
    var self = this

    this.tokenUpdater = new Thread('tokenUpdater', 60 * 1000 * 10, () => {
      const userController = new UserController(self)

      if (userController.getCurrentUser()) {
        logger.info('Sending the request to updated the user token')
        userController.updateToken()
      } else {
        logger.info('There is no token to uptade so the thread will wait for another chance')
      }
    })

    this.tokenUpdater.start()
  },

  destroyed () {
    this.tokenUpdater.stop()
  }
}
</script>
