<template>
  <div class="panel box box-primary">
    <div class="box-header with-border">
      <h4 class="box-title">
        <a data-toggle="collapse" :data-parent="'#' + this.$parent.id" :href="'#' + this.id " aria-expanded="true" class="">
          {{ this.title }}
        </a>
      </h4>
    </div>
    <div :id="this.id" :class="['panel-collapse', 'collapse', {'show': this.show}]" style="">
      <div class="box-body">
        <slot>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id', 'title', 'show']
}
</script>
