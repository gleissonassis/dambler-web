<template>
  <span class="text-red text-center">
    <span v-show="!this.view.showTimer"><i class="fa fa-clock-o" /> 00:00:00</span>
    <span v-if="this.view.showTimer && this.view.expiration > 0"><i class="fa fa-clock-o" /> {{ this.view.expiration | convertToTime }}</span>
    <strike v-if="this.view.showTimer && this.view.expiration <= 0"><i class="fa fa-clock-o" /> {{ this.view.expiration | convertToTime }}</strike>
  </span>
</template>

<script>
import DateHelper from '@/lib/helpers/DateHelper'
import Thread from '@/lib/Thread'

const dateHelper = new DateHelper()

export default {
  props: ['expiresOn'],
  data () {
    return {
      view: {
        expiration: dateHelper.getDiffSeconds(new Date(window.ServerDate.getTime()), this.expiresOn),
        showTimer: false
      }
    }
  },

  mounted () {
    const self = this

    this.timerUpdater = new Thread('TimerUpdater', 10, () => {
      let expiration = dateHelper.getDiffSeconds(new Date(window.ServerDate.getTime()), this.expiresOn)

      if (expiration <= 0) {
        self.view.expiration = 0

        // if the expiration get 0 the thread can be stopped
        self.timerUpdater.stop()
      } else {
        self.view.expiration = expiration
      }

      self.view.showTimer = true
    })
    this.timerUpdater.start()
  },

  destroyed () {
    this.timerUpdater.stop()
  }
}
</script>
