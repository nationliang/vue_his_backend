var express = require('express');
var router = express.Router();
var mysql = require('../model/connect')
var bodyParse = require('body-parser')

/* GET users listing. */
router.post('/signedin', function(req, res, next) {
  const body = req.body
  mysql.query(`select * from user where name='${body.name}'`, (err, rows, fileds) => {
    if (err) {
      throw err
    }
    if (!rows[0]) {
      res.send({ mes: '用户名不存在', status: 11 })
    } else if (rows[0].password !== body.password) {
      res.send({ mes: '密码不正确', status: 12 })
    } else {
      res.send({ mes: '', status: 10, kind: rows[0].kind })
    }
  })
});

router.post('/checkcode', function(req, res, next) {
  const index = Math.floor(Math.random() * 12)
  res.send({ index })
});

router.post('/reset', function(req, res, next) {
  const body = req.body
  mysql.query(`select * from user where name = '${body.name}'`, (err, rows, fields) => {
    if (err) {
      throw err
    }
    if (!rows[0]) {
      res.send({ status: 1 })
    } else {
      mysql.query(`update user set password='${body.password}', date='${body.date}' where name = '${body.name}'`)
      res.send({ status: 2 })
    }
  })
});

router.post('/register', function(req, res, next) {
  const body = req.body
  mysql.query(`select * from user where name = '${body.name}'`, (err, rows, fields) => {
    if (err) {
      throw err
    }
    if (rows.length) {
      res.send({ status: 1 })
    } else {
      mysql.query(`insert into user(name, sex, password, kind, date) values('${body.name}', ${body.sex}, '${body.password}', '${body.kind}', '${body.date}')`, (err, rows, fields) => {
        if (err) {
          throw err
        }
        res.send({ status: 2 })
      })
    }
  })
});

router.post('/sex', function(req, res, next) {
  const body = req.body
  // console.log(body)
  mysql.query(`select * from user where name='${body.name}'`, (err, rows, fields) => {
    if (err) {
      throw err
    }
    if (!rows[0]) {
      res.send({ sex: 3 })
    } else {
      res.send({ sex: rows[0].sex === 'm' ? 2 : 1 })
    }
  })
});

router.post('/changeuser', function(req, res, next) {
  const body = req.body
  mysql.query(`update user set password='${body.password}',sex=${body.sex} where name='${body.name}'`, (err, rows, fileds) => {
    if (err) {
      throw err
    }
    res.send({ status: 1 })
  })
});

module.exports = router;
