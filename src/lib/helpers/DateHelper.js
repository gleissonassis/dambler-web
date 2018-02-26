class DateHelper {
  getDiffSeconds (start, end) {
    const d1 = new Date(start)
    const d2 = new Date(end)

    return Math.round((d2.getTime() - d1.getTime()) / 1000, 0)
  }

  convertToTime (input, separator) {
    var pad = input => {
      return input < 10 ? '0' + input : input
    }

    return [
      pad(Math.floor(input / 3600)),
      pad(Math.floor(input % 3600 / 60)),
      pad(Math.floor(input % 60))
    ].join(separator || ':')
  }

  registerFilters (vue) {
    const self = this

    vue.filter('convertToTime', value => {
      return self.convertToTime(value)
    })
  }
}

export default DateHelper
