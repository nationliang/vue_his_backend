var express = require('express');
var router = express.Router();
var mysql = require('../model/connect');
var weekToDate = require('../utils/index');
const { query } = require('express');

router.post('/:operation', (req, res, next) => {
  const body = req.body
  if (req.params.operation === 'list') {
    mysql.query(`select * from symptom`, (err, rows, fields) => {
      if (err) {
        throw err
      }
      res.send(rows)
    })
  } else if (req.params.operation === 'delete') {
    mysql.query(`delete from symptom where id=${body.id}`, (err, rows, fileds) => {
      if (err) {
        throw err
      }
      res.send({ status: 1 })
    })
  } else if (req.params.operation === 'add') {
    mysql.query(`select * from symptom where name='${body.name}'`, (err, rows, fields) => {
      if (err) {
        throw err
      }
      if (rows.length) {
        res.send({ scode: 2 })
      } else {
        mysql.query(`insert into symptom(name, dep, content, date) values('${body.name}', '${body.dep}', '${body.content}', '${body.date}')`, (err, rows, fields) => {
          if (err) {
            throw err
          }
          res.send({ status: 1 })
        })
      }
    })
  } else if (req.params.operation === 'query') {
    let exp = /((^([^#]+)$)|(^([^#]+)(##[^#]+)*##([^#]+)$))/
    if (body.des.search(exp) === -1) {
      res.send({ mes: '请输入正确格式！' })
    } else {
      let queryArr = body.des.split('##')
      let len = queryArr.length
      let sql = `select * from symptom where content like '%${queryArr[0]}%'`
      let addStr = ''
      for (let i = 1; i < len; i++) {
        addStr += `or content like '%${queryArr[i]}%'`
      }
      if (addStr !== '') {
        sql += addStr 
      }

      mysql.query(sql, (err, rows, fields) => {
        if (err) {
          throw err
        }
        if (rows.length === 1) {
          res.send({ mes: '<p>并发症状：' + rows[0].content + '</p><p>初步诊断：' + rows[0].name + '</p><p>推荐挂号科室：' + rows[0].dep + '</p>' })
        } else if (rows.length > 1) {
          let mes = ''
          for (let i = 0; i < rows.length; i++) {
            mes += '<section><h1>诊断' + (i + 1) + '：</h1><p>并发症状：' + rows[i].content + '</p><p>初步诊断：' + rows[i].name + '</p><p>推荐挂号科室：' + rows[i].dep + '</p></section><br>' 
          }
          res.send({ mes })
        } else {
          res.send({ mes: '对不起，找不到匹配项，请重新检查输入或者到人工窗口咨询。' })
        }
      })
    }
  }
})

module.exports = router;