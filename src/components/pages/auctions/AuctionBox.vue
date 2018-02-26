<template>
  <box :hasFooter="false" :isLoading="this.view.isBiding">
    <slot slot="body">
      <div class="auction-product">
        <img class="card-img-top img-responsive" :src="auction.product.imageUrl" :alt="auction.product.name">
        <auction-winner-badge v-if="auction.bids.length > 0 && !this.view.isBiding" :auction="auction" />
      </div>
      <h4 class="card-title">
        {{ auction.product.name }} <br />
        <auction-timer :expiresOn="auction.expiresOn" />
      </h4>
      <p class="card-text">
        De <strike class="text-red">{{ auction.product.value | currency }}</strike>
        por <span class="text-green">{{ auction.value | currency }}</span>
      </p>
      <div class="row">
        <div class="col-lg-6">
          <a :href="'#/auctions/' + auction.id" class="btn btn-primary btn-block">Detalhes <i class="fa fa-share" /></a>
        </div>
        <div class="col-lg-6">
          <bid-button v-if="!auction.isExpired" v-on:bid="onBid" :auctionId="auction.id" :isBlock="true"/>
        </div>
      </div>
    </slot>
  </box>
</template>

<script>
import Box from '@/components/common/ui/Box'
import BidButton from '@/components/pages/auctions/BidButton'
import AuctionTimer from '@/components/pages/auctions/AuctionTimer'
import AuctionWinnerBadge from '@/components/pages/auctions/AuctionWinnerBadge'

export default {
  props: ['auction'],

  components: {
    Box,
    BidButton,
    AuctionTimer,
    AuctionWinnerBadge
  },

  data () {
    return {
      view: {
        isBiding: false
      }
    }
  },

  methods: {
    onBid (event) {
      this.view.isBiding = event.isBiding
    }
  }
}
</script>
