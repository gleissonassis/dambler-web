<template>
  <image-card
    :title="coinPackage.title"
    :hint="coinPackage.hint"
    :imageUrl="'/static/images/coin-packages/' + coinPackage.imageUrl"
    :isSelected="isSelected"
    :isLoading="view.isLoading">
    <slot slot="text">
      {{ isSelected }}
      {{ coinPackage.description}} por apenas <strong class="text-blue">{{ coinPackage.price | currency }}</strong>!
    </slot>
    <slot slot="content">
      <simplert :useRadius="true" :useIcon="true" ref="simplert" />
      <button @click="buyCoinPackage" :class="'btn btn-block ' + (isSelected ? 'btn-info':'btn-warning')">Comprar <i class="fa fa-share" /></button>
    </slot>
  </image-card>
</template>

<script>
import ImageCard from '@/components/common/ui/ImageCard'
import CoinPackageController from '@/lib/controllers/CoinPackageController'
import Logger from '@/lib/Logger'

const logger = new Logger('CoinPackageCard')

export default {
  props: ['coinPackage', 'isSelected'],

  data () {
    return {
      view: {
        isLoading: false
      }
    }
  },

  components: {
    ImageCard
  },

  methods: {
    buyCoinPackage () {
      const coinPackageController = new CoinPackageController(this)

      this.view.isLoading = true

      coinPackageController.buyCoinPackage(this.coinPackage.id)
        .then(res => {
          logger.debug(res)
          window.location = res.payerTracking.checkout.paymentUrl
        })
    }
  }
}
</script>
