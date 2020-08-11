var express = require('express');
var router = express.Router();
var mysql = require('../model/connect');

router.post('/userList', (req, res, next) => {
  const body = req.body
  mysql.query(`select * from user where name!='${body.user}'`, (err, rows, fields) => {
    if (err) {
      throw err
    }
    let data = [],
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

      data.push(item)
      item = {}
    }
    res.send(data)
  })
})

router.post('/messageNum', (req, res, next) => {
  const body = req.body
  mysql.query(`select * from communication where sender='${body.sender}' and receiver='${body.receiver}' and readed='n'`, (err, rows, fields) => {
    if (err) {
      throw err
    }
    res.send({ num: rows.length})
  })
})

module.exports = router;