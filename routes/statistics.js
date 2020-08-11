var express = require('express');
var router = express.Router();
var mysql = require('../model/connect');
var weekToDate = require('../utils/index')

router.post('/:operation', (req, res, next) => {
  const body = req.body
  let pat_num = 0
  let income = 0
  let expenditure = 0

  let medicineList = {
    nameList: [],
    inList: [],
    outList: []
  }
  if (req.params.operation === 'iande') {
    mysql.query(`select * from patient where state=4`, (err, rows, fields) => {
      if (err) {
        throw err
      }
      pat_num = rows.length
      income += pat_num * 10

      mysql.query(`select * from medicine`, (err, rows, fields) => {
        if (err) {
          throw err
        }
        for (let i = 0; i < rows.length; i++) {
          income += (rows[i].amount - rows[i].rest) * rows[i].price
          expenditure += rows[i].amount * rows[i].cost
        }

        mysql.query(`select * from checks`, (err, rows, fields) => {
          for (let i = 0; i < rows.length; i++) {
            income += rows[i].num * rows[i].price
          }
          res.send([income, expenditure])
        })
      })
    })
  } else if (req.params.operation === 'medicine') {
    mysql.query(`select * from medicine`, (err, rows, fields) => {
      if (err) {
        throw err
      }
      for(let i = 0; i < rows.length; i++) {
        medicineList.nameList.push(rows[i].name)
        medicineList.inList.push(rows[i].amount)
        medicineList.outList.push(rows[i].amount - rows[i].rest)
      }
      res.send(medicineList)
    })
  } else if (req.params.operation === 'doctor') {
    let doctorList = {
      doctorNameList: [],
      dataList: []
    }
    mysql.query(`select * from doc`, (err, rows, fields) => {
      for (let i = 0; i < rows.length; i++) {
        doctorList.doctorNameList.push(rows[i].name)
        doctorList.dataList.push(rows[i].pat_num)
      }
      res.send(doctorList)
    })
  }
})

module.exports = router;