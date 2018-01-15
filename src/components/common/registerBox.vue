<template>
  <form>
    <simplert :useRadius="true"
              :useIcon="true"
              ref="simplert">
    </simplert>
    <div class="form-group">
      <label for="name">Nome*</label>
      <input type="text" :class="[{'is-invalid': this.isUserNameInvalid}, 'form-control']" v-model="user.name" id="name" aria-describedby="nameHelp" placeholder="Seu nome ou como gostaria de ser chamado :)">
      <small id="nameHelp" class="form-text text-muted">Informe o nome que ficará visível para todos os usuários da plataforma.</small>
    </div>
    <div class="form-group">
      <label for="email">E-mail*</label>
      <input type="email" :class="[{'is-invalid': this.isUserEmailInvalid}, 'form-control']" v-model="user.email" id="email" aria-describedby="emailHelp" placeholder="email@dominio.com">
      <small id="emailHelp" class="form-text text-muted">Seu e-mail será utilizado para acessar a plataforma.</small>
    </div>
    <div class="form-group">
      <label for="password">Senha*</label>
      <input type="password" :class="[{'is-invalid': this.isUserPasswordInvalid}, 'form-control']" v-model="user.password" id="password" placeholder="Sua senha">
    </div>
    <div class="form-group">
      <label for="password-confirm">Senha*</label>
      <input type="password" :class="[{'is-invalid': this.isUserPasswordConfirmInvalid}, 'form-control']" v-model="user.passwordConfirm" id="password-confirm" aria-describedby="passwordConfirmHelp" placeholder="Confirmação da senha">
      <small id="passwordConfirmHelp" v-show="this.isPasswordConfirmValid" class="form-text text-muted">Informe a mesma senha do campo anterior.</small>
      <small id="passwordConfirmHelp" v-show="!this.isPasswordConfirmValid" class="form-text text-muted is-">As senhas informadas <span class="badge badge-danger">não</span> são as mesmas.</small>

    </div>
    <div class="form-group">
      <button class="btn btn-primary" v-on:click="newUserClick">Cadastrar</button>
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
        !this.user.name ||
        !this.user.password ||
        !this.user.passwordConfirm ||
        this.user.password !== this.user.passwordConfirm
    },
    isPasswordConfirmValid () {
      return !this.user.password || !this.user.passwordConfirm || this.user.password === this.user.passwordConfirm
    },
    isUserNameInvalid () {
      return this.validateFields && !this.user.name
    },
    isUserEmailInvalid () {
      return this.validateFields && !this.user.email
    },
    isUserPasswordInvalid () {
      return this.validateFields && !this.user.password
    },
    isUserPasswordConfirmInvalid () {
      return this.validateFields && this.user.password !== this.user.passwordConfirm
    }
  },

  mounted () {
  },

  methods: {

    newUserClick () {
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
        controller.createUser(this.user)
          .then(() => {
            this.$refs.simplert.openSimplert({
              title: 'Sucesso!',
              message: 'Um e-mail foi enviado para que você confirme seu cadastro',
              type: 'info',
              customCloseBtnText: 'Ok'
            })
          })
          .catch(error => {
            switch (error.status) {
              case 409:
                this.$refs.simplert.openSimplert({
                  title: 'E-mail já utilizado',
                  message: 'Um outro usuário já cadastrou esse e-mail! Tente outro, por favor.',
                  type: 'warning',
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
