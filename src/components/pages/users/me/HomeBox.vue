<template>
  <div>
    <form-element
      type="text"
      v-model="user.name"
      label="Nome *"
      placeholder="Seu nome ou como gostaria de ser chamado :)"
      :isValid="validations.fields.isNameValid" />
    <form-element
      type="email"
      v-model="user.email"
      label="E-mail *"
      placeholder="email@dominio.com"
      help="Seu e-mail será utilizado para acessar a plataforma."
      :isValid="validations.fields.isEmailValid" />
    <form-element
      type="password"
      v-model="user.password"
      label="Senha *"
      placeholder="Sua senha secreta"
      :isValid="true" />
    <form-element
      type="password"
      v-model="user.passwordConfirm"
      label="Confirmação de senha *"
      placeholder="Confirmação da sua senha secreta"
      :isValid="validations.fields.isPasswordConfirmValid">
        <small v-show="validations.fields.isPasswordConfirmValid" class="form-text text-muted">Informe a mesma senha do campo anterior.</small>
        <small v-show="!validations.fields.isPasswordConfirmValid" class="form-text text-muted">As senhas informadas <span class="badge badge-danger">não</span> são as mesmas.</small>
    </form-element>
  </div>
</template>

<script>
import Box from '@/components/common/ui/Box'
import Row from '@/components/common/ui/Row'
import Column from '@/components/common/ui/Column'
import FormElement from '@/components/common/form/Element'

export default {
  props: ['user', 'validations'],

  components: {
    Box,
    Row,
    Column,
    FormElement
  }
}
</script>
