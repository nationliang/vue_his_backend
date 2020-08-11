var mysql = require('../model/connect');
module.exports.getInfoNum = function (socket, flag) {
  mysql.query(`select * from user`, (err, rows, fields) => {
    if (err) {
      throw err
    }
    let dataSets = [],
        item = {}
    for (let i = 0; i < rows.length; i++) {
      item.name = rows[i].name
      switch (rows[i].kind) {
        case 'adm': {
          item.kind = '管理员'
          break
        }
        case 'doc': {
          item.kind = '医生'
          break
        }
        case 'med': {
          item.kind = '派药员'
          break
        }
        case 'cou': {
          item.kind = '收银员'
          break
        }
        case 'pat': {
          item.kind = '患者'
          break
        }
      }
      item.count = ''
      item.dialog = []

      dataSets.push(item)
      item = {}
    }
    if (flag === 'private') {
      socket.emit('getInfoNum' , dataSets)
    } else {
      socket.broadcast.emit('getInfoNum' , dataSets)
    }
  })
}