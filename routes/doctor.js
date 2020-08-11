var express = require('express');
var router = express.Router();
var mysql = require('../model/connect');
var weekToDate = require('../utils/index')

/* GET users listing. */
router.post('/dateList', function(req, res, next) {
  const body = req.body
  let dateItem = []
  let item = {
    patientMes: {}
  }
  mysql.query(`select * from patient where doctor='${body.name}' and state=1`, (err, rows, fileds) => {
    if (err) {
      throw err
    }
    for (let i = 0; i < rows.length; i++) {
      item.date = rows[i].date
      item.time = rows[i].time
      item.doctor = rows[i].doctor
      item.dep = rows[i].dep
      item.kind = rows[i].kind
      item.patient = rows[i].name
      item.id = rows[i].id
      item.patientMes.name = rows[i].name
      item.patientMes.sex = rows[i].sex
      item.patientMes.old = rows[i].old
      item.patientMes.idCard = rows[i].id_card
      item.patientMes.phoneNum = rows[i].phone_num
      item.patientMes.address = rows[i].address

      dateItem.push(item)
      item = {
        patientMes: {}
      }
    }
    res.send(dateItem)
  })
});

router.post('/medicineList', (req, res, next) => {
  mysql.query(`select * from medicine`, (err, rows, fields) => {
    if (err) {
      throw err
    }
    let data = []
    let item = {}
    for (let i = 0; i < rows.length; i++) {
      item.name = rows[i].name
      item.kind = rows[i].kind
      item.price = rows[i].price
      item.num = 0
      item.amount = 0
      item.isDeleted = false

      data.push(item)
      item = {}
    }
    res.send(data)
  })
})

router.post('/checkList', (req, res, next) => {
  mysql.query(`select * from checks`, (err, rows, fields) => {
    if (err) {
      throw err
    }
    let data = []
    let item = {}
    for (let i = 0; i < rows.length; i++) {
      item.checkName = rows[i].name
      item.checkPrice = rows[i].price
      item.checkNum = 0
      item.checkAmount = 0
      item.isDeleted = false

      data.push(item)
      item = {}
    }
    res.send(data)
  })
})

router.post('/submitHealMes', (req, res, next) => {
  const body = req.body
  let amount = 0
  mysql.query(`update doc set pat_num=pat_num+1 where id=${body.doc_id}`)
  mysql.query(`insert into pat_rec(pat, pat_id, date, des, sym, sol) values('${body.pat_name}', ${body.pat_id}, '${body.date}', '${body.description}', '${body.symptom}', '${body.solution}')`, (err, rows, fields) => {
    if (err) {
      throw err
    }
  })
  for (let i = 0; i < body.medicineList.length; i++) {
    amount += body.medicineList[i].amount
    mysql.query(`insert into pat_med(pat, pat_id, date, med_name, med_price, med_num, med_amount) values('${body.pat_name}', ${body.pat_id}, '${body.date}', '${body.medicineList[i].name}', ${body.medicineList[i].price}, ${body.medicineList[i].num}, ${body.medicineList[i].amount})`, (err, rows, fields) => {
      if (err) {
        throw err
      }
    })
    mysql.query(`update medicine set rest=rest - ${body.medicineList[i].num} where name='${body.medicineList[i].name}'`)
  }

  for (let i = 0; i < body.checkList.length; i++) {
    amount += body.checkList[i].checkAmount
    mysql.query(`insert into pat_check(pat, pat_id, date, che_name, che_price, che_num, che_amount) values('${body.pat_name}', ${body.pat_id}, '${body.date}', '${body.checkList[i].checkName}', ${body.checkList[i].checkPrice}, ${body.checkList[i].checkNum}, ${body.checkList[i].checkAmount})`, (err, rows, fields) => {
      if (err) {
        throw err
      }
    })
    mysql.query(`update checks set num=num + ${body.checkList[i].checkNum} where name='${body.checkList[i].checkName}'`)
  }

  mysql.query(`update patient set state=2, fee=${amount} where id=${body.pat_id}`, (err, rows, fields) => {
    if (err) {
      throw err
    }
  })
  res.send({ status: 1 })
})

router.post('/historyList', (req, res, next) => {
  const body = req.body
  mysql.query(`select * from patient where doctor='${body.name}' and state!=1`, (err, rows, fields) => {
    if (err) {
      throw err
    }
    res.send(rows)
  })
})

router.post('/id', (req, res, next) => {
  const body = req.body
  mysql.query(`select * from doc where name='${body.name}'`, (err, rows, fields) => {
    if (err) {
      throw err
    }
    if (rows.length) {
      res.send({ doc_id: rows[0].id })
    } else {
      res.send({ doc_id: -1 })
    }
  })
})

module.exports = router;