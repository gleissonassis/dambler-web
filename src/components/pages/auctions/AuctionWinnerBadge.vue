<template>
  <span
    :class="this.view.classes"
    :title="this.view.hint">
    <i class="fa fa-trophy" /> {{ this.auction.bids[0].user.name }}
  </span>
</template>

<script>
export default {
  props: ['auction'],
  data () {
    return {
      view: {
        classes: ['badge', {'bg-red': !this.auction.isExpired, 'bg-green': this.auction.isExpired}],
        hint: !this.auction.isExpired ? 'Quem está ganhando!' : 'Ganhador desse leilão!'
      }
    }
  }
}
</script>

<style scoped>
.badge {
  position: absolute;
  top: -6px;
  right: -10px
}
</style>
