<template>
  <page title="Comprar moedas">
    <row>
      <column v-for="coinPackage in this.coinPackages" :key="coinPackage.id" cols="3">
        <coin-package-card
          :coinPackage="coinPackage"
          :isSelected="coinPackage.id === $route.params.id" />
      </column>
    </row>
  </page>
</template>

<script>
import Page from '@/components/common/page/Page'
import Row from '@/components/common/ui/Row'
import Column from '@/components/common/ui/Column'
import CoinPackageCard from '@/components/pages/coin-packages/CoinPackageCard'
import CoinPackageController from '@/lib/controllers/CoinPackageController'

export default {
  components: {
    Page,
    Row,
    Column,
    CoinPackageCard
  },

  data () {
    return {
      coinPackages: []
    }
  },

  mounted () {
    this.loadCoinPackages()
  },

  methods: {
    loadCoinPackages () {
      const self = this
      return new Promise((resolve, reject) => {
        var coinPackageController = new CoinPackageController(self)

        coinPackageController.getAll()
          .then(coinPackages => {
            self.coinPackages = coinPackages
            return coinPackages
          })
          .then(resolve)
          .catch(reject)
      })
    }
  }
}
</script>
