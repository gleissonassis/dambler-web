<template>
  <page title="Leilão">
    <simplert :useRadius="true" :useIcon="true" ref="simplert" />
    <box v-if="this.view.isFound" :title="this.auction.product.name" :isLoading="this.view.isBiding">
      <slot slot="body">
        <div class="row">
          <div :class="[{'col-sm-3': !this.view.isExpired, 'col-sm-4': this.view.isExpired}]">
            <div class="description-block border-right">
              <div class="description-percentage text-red"><i class="fa fa-caret-up"></i> {{ this.auction.product.value | currency }}</div>
              <span class="description-text">Preço de mercado</span>
            </div>
          </div>
          <div :class="[{'col-sm-3': !this.view.isExpired, 'col-sm-4': this.view.isExpired}]">
            <div class="description-block border-right">
              <div class="description-percentage text-green"><i class="fa fa-caret-down"></i> {{ this.auction.value | currency}}</div>
              <span class="description-text">Preço Ninja</span>
            </div>
          </div>
          <div :class="[{'col-sm-3': !this.view.isExpired, 'col-sm-4': this.view.isExpired}]">
            <div v-if="!this.view.isExpired" class="description-block text-center">
              <div class="description-percentage"><auction-timer :expiresOn="this.auction.expiresOn" /></div>
              <div class="description-text">
                <div class="progress">
                  <div class="progress-bar progress-bar-danger progress-bar-striped progress-bar-animated" :style="{width: this.view.expirationPercentage + '%'}">
                  </div>
                </div>
              </div>
            </div>
            <div v-if="this.view.isExpired">
              <span class="info-box-icon bg-green"><i class="fa fa-trophy"></i></span>
              <div class="info-box-content">
                <p v-if="this.auction.bids.length">
                  Parabéns ao ninja
                  <strong>{{ this.auction.bids[0].user.name }}</strong>
                  por ter levado esse produto por apenas <strong>{{ this.auction.value | currency}}</strong>.
                </p>
                <p v-if="this.auction.bids.length === 0">
                  O leilão encerrou sem vencedor. Coisa difícil de acreditar, não?
                </p>
              </div>
            </div>
          </div>
          <div v-if="!this.view.isExpired" class="col-sm-3">
            <div class="description-block">
              <span class="description-text">
                <bid-button v-on:bid="onBid" :auctionId="this.auction.id" :isBlock="true" :isLage="true" />
              </span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 col-lg-6 text-center">
            <img :src="this.auction.product.imageUrl" />
          </div>
          <div class="col-md-12 col-lg-6">
            <ul class="nav nav-tabs customtab" role="tablist">
              <li class="nav-item"> <a class="nav-link active" data-toggle="tab" href="#bids" role="tab"><span class="hidden-xs-down">Histórico</span></a> </li>
              <li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#info" role="tab"><span class="hidden-xs-down">Sobre o produto</span></a> </li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" id="bids" role="tabpanel">
                <table class="table table-hover table-responsive">
                  <tr>
                    <th style="width: 10px">#</th>
                    <th>Ninjas</th>
                  </tr>
                  <tr v-for="bid in this.auction.bids" :key="bid.index">
                    <td>{{ bid.index }}.</td>
                    <td>
                      {{ bid.user.name }}
                      <span v-if="bid.index === 1" class="badge bg-blue">
                        <i class="fa fa-trophy" />
                        <span v-if="!view.isExpired">Está levando!</span>
                        <span v-if="view.isExpired">O Ninja!</span>
                      </span>
                    </td>
                  </tr>
                </table>
              </div>
              <div class="tab-pane pad" id="info" role="tabpanel">
                <div class="pad">
                  <p>{{ auction.product.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </slot>
      <slot slot="footer">

      </slot>
    </box>
  </page>
</template>

<script>
import Page from '@/components/common/page/Page'
import Box from '@/components/common/ui/Box'
import BidButton from '@/components/pages/auctions/BidButton'
import AuctionTimer from '@/components/pages/auctions/AuctionTimer'
import AuctionController from '@/lib/controllers/AuctionController'
import MessageBox from '@/lib/ui/MessageBox'
import DateHelper from '@/lib/helpers/DateHelper'
import Thread from '@/lib/Thread'

let dateHelper = null

export default {
  timerIntervalToken: null,
  components: {
    Page,
    Box,
    BidButton,
    AuctionTimer
  },

  data () {
    return {
      // to prevent errors an empty auction is set
      auction: {
        product: {
        }
      },
      view: {
        isFound: false,
        isBiding: false,
        auctionExpiration: 0,
        isExpired: false,
        expirationPercentage: 0
      }
    }
  },

  mounted () {
    const self = this

    dateHelper = new DateHelper(self)

    self.getAuction()
      .then(() => {
        self.auctionUpdater = new Thread('auctionUpdater', 500, () => {
          self.getAuction()
        })

        self.auctionUpdater.start()
      })
  },

  destroyed () {
    if (this.auctionUpdater) {
      this.auctionUpdater.stop()
    }
  },

  methods: {
    getAuction () {
      const self = this

      return new Promise((resolve, reject) => {
        const messageBox = new MessageBox(self)
        const id = self.$route.params.id
        const auctionController = new AuctionController(self)

        auctionController.getById(id)
          .then(auction => {
            self.auction = auction

            self.view.isFound = true
            self.view.auctionExpiration = dateHelper.getDiffSeconds(new Date(), auction.expiresOn)

            if (self.view.auctionExpiration < 0) {
              self.view.isExpired = true
              this.auctionUpdater.stop()
            } else {
              self.view.isExpired = false

              // if is true auction is online
              if (self.auction.duration >= self.view.auctionExpiration) {
                self.view.expirationPercentage = (1 - (self.view.auctionExpiration / self.auction.duration)) * 100
              }
            }

            return auction
          })
          .then(resolve)
          .catch(e => {
            if (e.status === 404) {
              self.view.isFound = false
              self.$router.push('/auctions/online')
            } else {
              this.auctionUpdater.stop()
              messageBox.showCriticalError()
            }

            reject(e)
          })
      })
    },

    onBid (event) {
      this.view.isBiding = event.isBiding
      this.getAuction(this.auction.id)
    }
  }
}
</script>
