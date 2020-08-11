var express = require('express');
var router = express.Router();

var mysql = require('../model/connect')

router.post('/manage/:operate', function(req, res, next) {
  const body = req.body
  if (req.params.operate === 'delete') {
    mysql.query(`delete from medicine where id = ${ body.id }`, (err, rows, fields) => {
      if (err) {
        throw err
      } 
      res.send({ scode: 1 })
    })
  } else if (req.params.operate === 'list') {
    mysql.query("select * from medicine", (err, rows, fields) => {
      if (err) {
        throw err
      }
      res.send(rows)
    })
  } else if (req.params.operate === 'add') {
    mysql.query(`select * from medicine where name='${body.name}'`, (err, rows, fields) => {
      if (err) {
        throw err
      }
      if (rows.length) {
        res.send({ scode: 2 })
      } else {
        mysql.query(`insert into medicine(name, kind, amount, date, rest, des, price, cost) values('${ body.name }', '${ body.kind }', ${ body.amount }, '${ body.date }', ${body.amount}, '${ body.des }', ${body.price}, ${body.cost})`, (err, rows, fields) => {
          if (err) {
            throw err
          }
          res.send({ scode: 1 })
        })
      }
    })
  }
});

router.post('/distribute/:operation', (req, res, next) => {
  const body = req.body
  let data = []
  let item  = {}
  if (req.params.operation === 'list') {
    mysql.query(`select * from patient where state=3`, (err, rows, fields) => {
      if (err) {
        throw err
      }
      res.send(rows)
    })
  } else if (req.params.operation === 'finishDistribution') {
    mysql.query(`update patient set state=4 where id=${body.id}`, (err, rows, fields) => {
      if (err) {
        throw err
      }
      res.send({ status: 1 })
    })
  } else if (req.params.operation === 'detail') {
    mysql.query(`select * from pat_med where pat_id=${body.id}`, (err, rows, fields) => {
      if (err) {
        throw err
      }
      let data = []
      for (let i = 0; i < rows.length; i++) {
        data.push({
          name: rows[i].med_name,
          num: rows[i].med_num
        })
      }
      res.send(data)
    })
  }
})

module.exports = router;
