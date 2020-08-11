var express = require('express');
var router = express.Router();
var mysql = require('../model/connect');
var weekToDate = require('../utils/index')

router.post('/patientList', (req, res, next) => {
  mysql.query(`select * from patient where state=2`, (err, rows, fields) => {
    if (err) {
      throw err
    }
    res.send(rows)
  })
})

router.post('/finishPayment', (req, res, next) => {
    const body = req.body
    mysql.query(`update patient set state=3, counter='${body.counter}' where id=${body.id}`, (err, rows, fields) => {
      if (err) {
        throw err
      }
      res.send({ status: 1 })
    })
  })

module.exports = router;