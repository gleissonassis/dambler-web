import ResourceHelper from '@/lib/helpers/ResourceHelper'

const resourceHelper = new ResourceHelper()

class NotificationController {
  constructor (vueContext) {
    this.vueContext = vueContext
  }

  sendNotification (data) {
    return new Promise((resolve, reject) => {
      resourceHelper.post('/api/v1/notifications', data)
        .then(resolve)
        .catch(reject)
    })
  }

  sendPasswordResetNotification (email) {
    return this.sendNotification({
      type: 'reset-password',
      email
    })
  }
}

export default NotificationController
