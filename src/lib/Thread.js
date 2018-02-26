class Thread {
  constructor (name, interval, fn) {
    this.name = name
    this.interval = interval
    this.fn = fn
  }

  start () {
    this.token = setInterval(this.fn, this.interval)
  }

  stop () {
    clearInterval(this.token)
  }
}

export default Thread
