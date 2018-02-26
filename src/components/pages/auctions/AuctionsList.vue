<template>
  <page :title="this.view.pageTitle">
    <div class="row">
      <div v-for="auction in this.auctions" :key="auction.id" class="col-md-12 col-lg-3">
        <auction-box :auction="auction" />
      </div>
    </div>
  </page>
</template>

<script>
import AuctionController from '@/lib/controllers/AuctionController'
import Thread from '@/lib/Thread'
import Page from '@/components/common/page/Page'
import FormElement from '@/components/common/form/Element'
import AuctionBox from '@/components/pages/auctions/AuctionBox'

export default {
  props: ['type'],

  components: {
    Page,
    FormElement,
    AuctionBox
  },

  data: function () {
    return {
      auctions: [],
      view: {
        pageTitle: ''
      }
    }
  },

  mounted () {
    var self = this

    switch (self.type.toLowerCase()) {
      case 'open':
        self.view.pageTitle = 'Leilões abertos'
        break
      case 'online':
        self.view.pageTitle = 'Leilões em andamento'
        break
      default:
        self.view.pageTitle = 'Leilões'
    }

    self.loadAuctions()
      .then(() => {
        self.auctionsUpdater = new Thread('auctionsUpdater', 500, () => {
          self.loadAuctions()
        })

        self.auctionsUpdater.start()
      })
  },

  destroyed () {
    if (this.auctionsUpdater) {
      this.auctionsUpdater.stop()
    }
  },

  methods: {
    loadAuctions () {
      const self = this

      return new Promise((resolve, reject) => {
        const auctionController = new AuctionController(this)
        auctionController.getAuctions(self.type)
          .then(auctions => {
            self.auctions = auctions
            return auctions
          })
          .then(resolve)
          .catch(reject)
      })
    }
  }
}
</script>
