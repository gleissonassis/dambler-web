<template>
  <aside class="main-sidebar">
    <section class="sidebar">
      <ul class="sidebar-menu" data-widget="tree">
        <li :class="['treeview', {'active': this.isHomeActive}]">
          <router-link to="/home"><i class="fa fa-home"></i> Home</router-link>
        </li>
        <li :class="['treeview', {'active': this.isAuctionsActive}]">
          <a href="#">
            <i class="fa fa-gavel"></i> <span>Leilões</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><router-link to="/auctions/online"> Em andamento</router-link></li>
            <li><router-link to="/auctions/open"> Abertos</router-link></li>
            <li><router-link to="/auctions/closed"> Concluídos</router-link></li>
          </ul>
        </li>
        <li :class="['treeview', {'active': this.isRegisterActive}]">
          <router-link to="/skins/auctions"><i class="fa fa-gamepad"></i> Skins</router-link>
        </li>
        <li :class="['treeview', {'active': this.isRegisterActive}]">
          <router-link to="/equipments/auctions"><i class="fa fa-headphones"></i> Equipamentos</router-link>
        </li>
        <li :class="['treeview', {'active': this.isRegisterActive}]">
          <router-link to="/eletronics/auctions"><i class="fa fa-tv"></i> Eletrônicos</router-link>
        </li>
        <li :class="['treeview', {'active': this.isRegisterActive}]">
          <router-link to="/register"><i class="fa fa-users"></i> Cadastrar</router-link>
        </li>
        <li :class="['treeview', {'active': this.isFAQActive}]">
          <router-link to="/faq"><i class="fa fa-question-circle-o"></i> Como funciona?</router-link>
        </li>
        <li :class="['treeview', {'active': this.isBuyCoinsActive}]">
          <router-link to="/buy"><i class="fa fa-money"></i> Comprar moedas</router-link>
        </li>
        <li v-if="!this.view.isLoggedOn" :class="['treeview', {'active': this.isLoginActive}]">
          <router-link to="/login"><i class="fa fa-sign-in"></i> Acessar</router-link>
        </li>
      </ul>
    </section>
  </aside>
</template>

<script>
import UserController from '@/lib/controllers/UserController'
import EventBus from '@/lib/EventBus'

export default {
  name: 'navbar',

  data () {
    const userController = new UserController(this)
    return {
      view: {
        isLoggedOn: userController.getCurrentToken() !== null &&
                    userController.getCurrentToken() !== undefined
      }
    }
  },

  computed: {
    isHomeActive () {
      return this.$route.path === '/' ||
             this.$route.path === '/home'
    },

    isAuctionsActive () {
      return this.$route.path.startsWith('/auctions')
    },

    isRegisterActive () {
      return this.$route.path === '/register'
    },

    isFAQActive () {
      return this.$route.path === '/faq'
    },

    isBuyCoinsActive () {
      return this.$route.path === '/buy-coins'
    },

    isLoginActive () {
      return this.$route.path === '/login'
    }
  },

  mounted () {
    var self = this

    EventBus.$on('new-user', user => {
      self.view.isLoggedOn = user != null
    })
  }
}
</script>
