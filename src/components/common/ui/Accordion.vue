<template>
  <div class="box-group" :id="this.id">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['id']
}
</script>
