<template>
  <div class="box box-default" :style="isSelected ? 'padding: 0px !important':''">
    <img class="card-img-top img-responsive" :src="imageUrl" :title="hint" :alt="hint">
    <div class="box-body">
      <h4 class="card-title">{{ title }}</h4>
      <p class="card-text">
        <slot name="text"></slot>
      </p>
      <slot name="content"></slot>
      <slot></slot>
    </div>
    <div class="overlay" v-show="isLoading">
      <i class="fa fa-refresh fa-spin"></i>
    </div>
  </div>
</template>
<script>
export default {
  props: ['imageUrl', 'hint', 'title', 'isLoading', 'isSelected']
}
</script>
