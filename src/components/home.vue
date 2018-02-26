<template>
  <div>
    <row>
      <column cols="9">
        <section class="content">
          <h2 class="page-header">
            Em andamento
          </h2>
          <row>
            <div v-for="auction in auctions.open" :key="auction.id" class="col-lg-4">
              <auction-box :auction="auction" />
            </div>
          </row>
        </section>
        <section class="content">
          <h2 class="page-header">
            Finalizados
          </h2>
          <row>
            <div v-for="auction in auctions.closed" :key="auction.id" class="col-lg-4">
              <auction-box :auction="auction" />
            </div>
          </row>
        </section>
      </column>
      <column cols="3">
        <section class="content">
          <h2 class="page-header">
            O que é OClick.ninja?
          </h2>
          <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
              <li data-target="#carousel-example-generic" data-slide-to="1" class=""></li>
              <li data-target="#carousel-example-generic" data-slide-to="2" class=""></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="img-fluid" src="/static/images/faq1.png" alt="First slide">

                <div class="carousel-caption">
                  Rápido+Fácil+Seguro
                </div>
              </div>
              <div class="carousel-item">
                <img class="img-fluid" src="/static/images/faq2.png" alt="First slide">
                <div class="carousel-caption">
                  Grandes descontos!
                </div>
              </div>
              <div class="carousel-item">
                <img class="img-fluid" src="/static/images/faq3.png" alt="First slide">
                <div class="carousel-caption">
                  Compre ja as suas!
                </div>
              </div>
            </div>
            <a class="carousel-control-prev" href="#carousel-example-generic" data-slide="prev">
              <span class="fa fa-angle-left"></span>
            </a>
            <a class="carousel-control-next" href="#carousel-example-generic" data-slide="next">
              <span class="fa fa-angle-right"></span>
            </a>
          </div>
        </section>
      </column>
    </row>
  </div>
</template>

<script>
import Row from '@/components/common/ui/Row'
import Column from '@/components/common/ui/Column'
import Box from '@/components/common/ui/Box'
import AuctionBox from '@/components/pages/auctions/AuctionBox'
import AuctionController from '@/lib/controllers/AuctionController'
import Thread from '@/lib/Thread'

export default {
  components: {
    Row,
    Column,
    Box,
    AuctionBox
  },

  data () {
    return {
      auctions: {
        open: [],
        clsed: []
      }
    }
  },

  mounted () {
    var self = this

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
      return new Promise((resolve, reject) => {
        var self = this
        const auctionsController = new AuctionController(this)

        auctionsController.getAllAuctions()
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
