var logs = []

class Logger {
  constructor (name) {
    this.name = name
  }

  message (type, message, error) {
    console.log(`[${type}] [${this.name}]`, message)
    if (error) {
      console.log(error)
    }
    logs.push({name, type, message, error})

    if (logs.length > 100) {
      logs.shift()
    }
  }

  info (message) {
    this.message('info', message)
  }

  debug (message) {
    this.message('debug', message)
  }

  warn (message) {
    this.message('warn', message)
  }

  error (message, error) {
    this.message('error', message, error)
  }
}

export default Logger
