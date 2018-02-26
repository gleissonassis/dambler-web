import Logger from '@/lib/Logger'

const logger = new Logger('MessageBox')

class MessageBox {
  constructor (vueContext) {
    if (!vueContext) {
      logger.error('There is no Vue context linked to this MessageBox instance')
    } else if (!vueContext.$refs.simplert) {
      logger.error('There is no simplert linked to this MessageBox instance')
    }

    this.vueContext = vueContext
  }

  showMessage (title, message, type, customCloseBtnText, onClose) {
    this.vueContext.$refs.simplert.openSimplert({
      title,
      message,
      type,
      customCloseBtnText,
      onClose: onClose
    })
  }

  showError (title, message, onClose) {
    this.showMessage(title, message, 'error', 'ok', onClose)
  }

  showInfo (title, message, onClose) {
    this.showMessage(title, message, 'info', 'ok', onClose)
  }

  showWarning (title, message, onClose) {
    this.showMessage(title, message, 'warning', 'ok', onClose)
  }

  showSuccess (message, onClose) {
    this.showInfo('Tudo certo!!!', message, onClose)
  }

  showCriticalError (error, onClose) {
    console.log(error)
    this.showError('OMG!!!', 'Algo muito estranho está acontecendo com nossos servidores! Tente novamente mais tarde', onClose)
  }

  showRequiredFieldsMessage () {
    this.showError('Campos não preenchidos!', 'Todos os campos destacados com * precisam ser preenchidos!')
  }
}

export default MessageBox
