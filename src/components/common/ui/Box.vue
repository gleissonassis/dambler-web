<template>
  <div class="box box-default">
    <div v-if="title" class='box-header with-border'>
      <h3 class='box-title'>{{ title }}</h3>
    </div>
    <div class='box-body'>
      <slot name="body">
      </slot>
    </div>
    <div class="overlay" v-show="isLoading">
      <i class="fa fa-refresh fa-spin"></i>
    </div>
    <div v-if="hasFooter" class='box-footer'>
      <slot name="footer">
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  props: ['title', 'isLoading', 'hasFooter']
}
</script>
