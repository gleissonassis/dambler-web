<template>
  <span>
    <simplert :useRadius="true" :useIcon="true" ref="simplert" />
    <button type="button" :class="[{'btn-lg': isLarge, 'btn-block': isBlock}, 'btn', 'btn-warning']" v-on:click="performBid">
      <i class="fa fa-gavel" /> Dar lance!
    </button>
  </span>
</template>

<script>
import AuctionController from '@/lib/controllers/AuctionController'
import MessageBox from '@/lib/ui/MessageBox'
import Logger from '@/lib/Logger'
import EventBus from '@/lib/EventBus'

const logger = new Logger('BidButton')

export default {
  props: ['auctionId', 'isLarge', 'isBlock'],
  data () {
    return {
      view: {
        isBiding: false
      }
    }
  },
  methods: {
    performBid () {
      const self = this

      return new Promise((resolve, reject) => {
        const auctionController = new AuctionController(self)
        const messageBox = new MessageBox(self)
        const id = self.auctionId

        logger.info(`Performing a new bid to auction ${id}`)

        self.view.isBiding = true
        const bidEventArgs = {isBiding: self.view.isBiding, hasError: false}
        self.$emit('bid', bidEventArgs)
        EventBus.$emit('bid', bidEventArgs)

        auctionController.performBid(id)
          .then(() => {
            logger.info(`The bid has beed performed successfully`)
            self.view.isBiding = false

            const bidEventArgs = {isBiding: self.view.isBiding, hasError: false}
            self.$emit('bid', bidEventArgs)
            EventBus.$emit('bid', bidEventArgs)
          })
          .catch((e) => {
            logger.error(`An error has occurred while performing a bid`, e)
            self.view.isBiding = false

            const bidEventArgs = {isBiding: self.view.isBiding, hasError: true, error: e}
            self.$emit('bid', bidEventArgs)
            EventBus.$emit('bid', bidEventArgs)

            switch (e.status) {
              case 403:
                messageBox.showError('Você não está logado!', 'Para dar lances você precisar estar autenticado. Clique <a href="#/register">aqui</a> e crie já sua conta!')
                break
              case 404:
                messageBox.showWarning('Leilão não encontrado :(', 'O leilão que você tentou dar um lance não existe!')
                break
              case 409:
                if (e.body.code === 2) {
                  messageBox.showWarning('E as moedas?', 'Para você dar lances é necessário que sua carteira tenha moedas!')
                } else {
                  messageBox.showError('Leilão fechado!', 'O leilão que você tentou dar um lance não está mais aberto!')
                }
                break
              case 500:
                messageBox.showCriticalError()
            }
          })
      })
    }
  }
}
</script>
