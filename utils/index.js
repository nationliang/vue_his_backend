module.exports = function WeekToDate (w, s) {
  let ymd = s.split('-')
  let y = parseInt(ymd[0])
  let m = parseInt(ymd[1])
  let d = parseInt(ymd[2])
  let date = new Date()
  date.setFullYear(y)
  date.setMonth(m - 1)
  date.setDate(d)

  let dateStr = ''

  let currentWeek = date.getDay()
  if (currentWeek === 1) {
    if (w === 'mon') {
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'tue') {
      date.setDate(date.getDate() + 1)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'wedn') {
      date.setDate(date.getDate() + 2)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'thur') {
      date.setDate(date.getDate() + 3)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'fri') {
      date.setDate(date.getDate() + 4)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'sat') {
      date.setDate(date.getDate() + 5)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'sun') {
      date.setDate(date.getDate() + 6)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }
  } else if (currentWeek === 2) {
    if (w === 'mon') {
      date.setDate(date.getDate() - 1)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'tue') {
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'wedn') {
      date.setDate(date.getDate() + 1)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'thur') {
      date.setDate(date.getDate() + 2)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'fri') {
      date.setDate(date.getDate() + 3)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'sat') {
      date.setDate(date.getDate() + 4)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'sun') {
      date.setDate(date.getDate() + 5)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }
  } else if (currentWeek === 3) {
    if (w === 'mon') {
      date.setDate(date.getDate() - 2)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'tue') {
      date.setDate(date.getDate() - 1)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'wedn') {
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'thur') {
      date.setDate(date.getDate() + 1)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'fri') {
      date.setDate(date.getDate() + 2)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'sat') {
      date.setDate(date.getDate() + 3)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'sun') {
      date.setDate(date.getDate() + 4)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }
  } else if (currentWeek === 4) {
    if (w === 'mon') {
      date.setDate(date.getDate() - 3)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'tue') {
      date.setDate(date.getDate() - 2)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'wedn') {
      date.setDate(date.getDate() - 1)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'thur') {
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'fri') {
      date.setDate(date.getDate() + 1)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'sat') {
      date.setDate(date.getDate() + 2)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'sun') {
      date.setDate(date.getDate() + 3)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }
  } else if (currentWeek === 5) {
    if (w === 'mon') {
      date.setDate(date.getDate() - 4)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'tue') {
      date.setDate(date.getDate() - 3)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'wedn') {
      date.setDate(date.getDate() - 2)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'thur') {
      date.setDate(date.getDate() - 1)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'fri') {
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'sat') {
      date.setDate(date.getDate() + 1)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'sun') {
      date.setDate(date.getDate() + 2)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }
  } else if (currentWeek === 6) {
    if (w === 'mon') {
      date.setDate(date.getDate() - 5)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'tue') {
      date.setDate(date.getDate() - 4)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'wedn') {
      date.setDate(date.getDate() - 3)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'thur') {
      date.setDate(date.getDate() - 2)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'fri') {
      date.setDate(date.getDate() - 1)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'sat') {
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'sun') {
      date.setDate(date.getDate() + 1)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }
  } else if (currentWeek === 6) {
    if (w === 'mon') {
      date.setDate(date.getDate() - 5)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'tue') {
      date.setDate(date.getDate() - 4)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'wedn') {
      date.setDate(date.getDate() - 3)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'thur') {
      date.setDate(date.getDate() - 2)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'fri') {
      date.setDate(date.getDate() - 1)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'sat') {
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'sun') {
      date.setDate(date.getDate() + 1)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }
  } else if (currentWeek === 0) {
    if (w === 'mon') {
      date.setDate(date.getDate() - 6)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'tue') {
      date.setDate(date.getDate() - 5)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'wedn') {
      date.setDate(date.getDate() - 4)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'thur') {
      date.setDate(date.getDate() - 3)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'fri') {
      date.setDate(date.getDate() - 2)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'sat') {
      date.setDate(date.getDate() - 1)
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    } else if (w === 'sun') {
      dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }
  }
  ymd = dateStr.split('-')
  y = parseInt(ymd[0])
  m = parseInt(ymd[1])
  d = parseInt(ymd[2])

  if (m < 10) {
    m = '0' + m
  }
  if (d < 10) {
    d = '0' + d
  }
  return y + '-' + m + '-' + d
}