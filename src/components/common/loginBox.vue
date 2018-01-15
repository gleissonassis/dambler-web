<template>
  <form>
    <simplert :useRadius="true"
              :useIcon="true"
              ref="simplert">
    </simplert>
    <div class="form-group">
      <label for="email">E-mail*</label>
      <input type="email" :class="[{'is-invalid': this.isUserEmailInvalid}, 'form-control']" v-model="user.email" id="email" aria-describedby="emailHelp" placeholder="email@dominio.com">
    </div>
    <div class="form-group">
      <label for="password">Senha*</label>
      <input type="password" :class="[{'is-invalid': this.isUserPasswordInvalid}, 'form-control']" v-model="user.password" id="password" placeholder="Sua senha">
    </div>
    <div class="form-group">
      <button class="btn btn-primary" v-on:click="login">Entrar</button>
    </div>
  </form>
</template>

<script>
import UserController from '@/lib/controllers/UserController'

export default {
  data: function () {
    return {
      validateFields: false,
      user: {}
    }
  },
  computed: {
    isFormInvalid () {
      return !this.user.email ||
        !this.user.password
    },
    isUserEmailInvalid () {
      return this.validateFields && !this.user.email
    },
    isUserPasswordInvalid () {
      return this.validateFields && !this.user.password
    }
  },

  mounted () {
  },

  methods: {

    login () {
      this.validateFields = true

      var controller = new UserController()

      if (this.isFormInvalid) {
        this.$refs.simplert.openSimplert({
          title: 'Campos não preenchidos!',
          message: 'Todos os campos destacados com * precisam ser preenchidos!',
          type: 'error',
          customCloseBtnText: 'Ok'
        })
      } else {
        controller.login(this.user.email, this.user.password)
          .then(() => {
            this.$refs.simplert.openSimplert({
              title: 'Sucesso!',
              message: 'Login realizado com sucesso!',
              type: 'info',
              customCloseBtnText: 'Ok'
            })
          })
          .catch(error => {
            switch (error.status) {
              case 404:
                this.$refs.simplert.openSimplert({
                  title: 'Login inválido!',
                  message: 'Não foi possível acessar a plataforma com as credenciais informadas.',
                  type: 'error',
                  customCloseBtnText: 'Ok'
                })
                break
              default:
                this.$refs.simplert.openSimplert({
                  title: 'OMG!!!',
                  message: 'Algo muito estranho está acontecendo com nossos servidores! Tente novamente mais tarde',
                  type: 'error',
                  customCloseBtnText: 'Ok'
                })
            }
          })
      }
    }
  }
}
</script>
