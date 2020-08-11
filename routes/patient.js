var express = require('express');
var router = express.Router();
var mysql = require('../model/connect');
var weekToDate = require('../utils/index')

/* GET users listing. */
router.post('/showDateMes', function(req, res, next) {
  mysql.query(`select * from plan`, (err, rows, fileds) => {
    if (err) {
      throw err
    }
    let dateSets = []
    const dateItem = []
    let item = {}
    let dateArr = []
    let timeArr = [
      {
        text: '下午',
        value: '下午'
      },
      {
        text: '上午',
        value: '上午'
      },
      {
        text: '晚上',
        value: '晚上'
      }
    ]
    let kindArr = [
      {
        text: '普通号',
        value: '普通号'
      }
    ]
    let depArr = []
    let doctorArr = []
    for (let i = 0;i < rows.length; i++) {
      if (rows[i].date) {
        if (dateSets.indexOf(rows[i].date) === -1) {
          dateSets.push(rows[i].date)
          dateArr.push({
            text: weekToDate('mon', rows[i].date),
            value: weekToDate('mon', rows[i].date)
          })
          dateArr.push({
            text: weekToDate('tue', rows[i].date),
            value: weekToDate('tue', rows[i].date)
          })
          dateArr.push({
            text: weekToDate('wedn', rows[i].date),
            value: weekToDate('wedn', rows[i].date)
          })
          dateArr.push({
            text: weekToDate('thur', rows[i].date),
            value: weekToDate('thur', rows[i].date)
          })
          dateArr.push({
            text: weekToDate('fri', rows[i].date),
            value: weekToDate('fri', rows[i].date)
          })
          dateArr.push({
            text: weekToDate('sat', rows[i].date),
            value: weekToDate('sat', rows[i].date)
          })
          dateArr.push({
            text: weekToDate('sun', rows[i].date),
            value: weekToDate('sun', rows[i].date)
          })
        } else {

        }

        if (rows[i].mon) {
          item.department = rows[i].dep
          item.kind = '普通号'
          item.doctor = rows[i].mon
          item.date = weekToDate('mon', rows[i].date)
          item.fee = 10
          item.time = rows[i].time
          dateItem.push(item)
        }
        
        if (rows[i].tue) {
          item = {}
          item.department = rows[i].dep
          item.kind = '普通号'
          item.doctor = rows[i].tue
          item.date = weekToDate('tue', rows[i].date)
          item.fee = 10
          item.time = rows[i].time
          dateItem.push(item)
        }
  
        if (rows[i].wedn) {
          item = {}
          item.department = rows[i].dep
          item.kind = '普通号'
          item.doctor = rows[i].wedn
          item.date = weekToDate('wedn', rows[i].date)
          item.fee = 10
          item.time = rows[i].time
          dateItem.push(item)
        }

        if (rows[i].thur) {
          item = {}
          item.department = rows[i].dep
          item.kind = '普通号'
          item.doctor = rows[i].thur
          item.date = weekToDate('thur', rows[i].date)
          item.fee = 10
          item.time = rows[i].time
          dateItem.push(item)
        }
  
        if (rows[i].fri) {
          item = {}
          item.department = rows[i].dep
          item.kind = '普通号'
          item.doctor = rows[i].fri
          item.date = weekToDate('fri', rows[i].date)
          item.fee = 10
          item.time = rows[i].time
          dateItem.push(item)
        }
  
        if (rows[i].sat) {
          item = {}
          item.department = rows[i].dep
          item.kind = '普通号'
          item.doctor = rows[i].sat
          item.date = weekToDate('sat', rows[i].date)
          item.fee = 10
          item.time = rows[i].time
          dateItem.push(item)
        }

        if (rows[i].sun) {
          item = {}
          item.department = rows[i].dep
          item.kind = '普通号'
          item.doctor = rows[i].sun
          item.date = weekToDate('sun', rows[i].date)
          item.fee = 10
          item.time = rows[i].time
          dateItem.push(item)
        }
      }
    }
    mysql.query(`select * from dep`, (err, rows, fileds) => {
      if (err) {
        throw err
      }
      for (let i = 0; i < rows.length; i++) {
        depArr.push({ text: rows[i].name, value: rows[i].name })
      }
      mysql.query(`select * from doc`, (err, rows, fileds) => {
        if (err) {
          throw err
        }
        for (let i = 0; i < rows.length; i++) {
          doctorArr.push({
            text: rows[i].name,
            value: rows[i].name
          })
        }
        res.send({ dateItem, depArr, doctorArr, timeArr, dateArr, kindArr })
      })
    })
  })
});

router.post('/saveDateMes', function (req, res, next) {
  const body = req.body
  mysql.query(`insert into patient(name, sex, old, id_card, phone_num, address, doctor, dep, kind, date, time, fee, state, doc_del, pat_del) values('${body.name}',${body.sex}, '${body.old}', '${body.idCard}', '${body.phoneNumber}', '${body.address}', '${body.dateMessage.doctor}', '${body.dateMessage.department}', '${body.dateMessage.kind}', '${body.dateMessage.date}', '${body.dateMessage.time}', '${body.dateMessage.fee}', 1, 1, 1)`, (err, rows, fields) => {
    if (err) {
      throw err
    }
    res.send({ status: 1 })
  })
})

router.post('/getDatingRecords', (req, res, next) => {
  const body = req.body
  let dateRecords = []
  let docArr = []
  let depArr = []
  let dateArr = []
  mysql.query(`select * from patient where name='${body.name}' and state=1`, (err, rows, fields) => {
    if (err) {
      throw err
    }
    dateRecords = rows
    for (let i = 0; i < rows.length; i++) {
      dateArr.push({
        text: rows[i].date,
        value: rows[i].date
      })
    }
    mysql.query(`select * from doc`, (err, rows, fields) => {
      if (err) {
        throw err
      }
      for (let i = 0; i < rows.length; i++) {
        docArr.push({
          text: rows[i].name,
          value: rows[i].name
        })
      }
      mysql.query(`select * from dep`, (err, rows, fields) => {
        if (err) {
          throw err
        }
        for (let i = 0; i < rows.length; i++) {
          depArr.push({
            text: rows[i].name,
            value: rows[i].name
          })
        }
        res.send({
          dateRecords,
          docArr,
          depArr,
          dateArr
        })
      })
    })
  })
})

router.post('/getPayingRecords', (req, res, next) => {
  const body = req.body
  let dateRecords = []
  let docArr = []
  let depArr = []
  let dateArr = []
  mysql.query(`select * from patient where name='${body.name}' and state=2`, (err, rows, fields) => {
    if (err) {
      throw err
    }
    dateRecords = rows
    for (let i = 0; i < rows.length; i++) {
      dateArr.push({
        text: rows[i].date,
        value: rows[i].date
      })
    }
    mysql.query(`select * from doc`, (err, rows, fields) => {
      if (err) {
        throw err
      }
      for (let i = 0; i < rows.length; i++) {
        docArr.push({
          text: rows[i].name,
          value: rows[i].name
        })
      }
      mysql.query(`select * from dep`, (err, rows, fields) => {
        if (err) {
          throw err
        }
        for (let i = 0; i < rows.length; i++) {
          depArr.push({
            text: rows[i].name,
            value: rows[i].name
          })
        }
        res.send({
          dateRecords,
          docArr,
          depArr,
          dateArr
        })
      })
    })
  })
})

router.post('/getHistoryRecords', (req, res, next) => {
  const body = req.body
  let dateRecords = []
  let docArr = []
  let depArr = []
  let dateArr = []
  let pillArr = []
  let counterArr = []
  mysql.query(`select * from patient where name='${body.name}' and state=4 and pat_del=1`, (err, rows, fields) => {
    if (err) {
      throw err
    }
    dateRecords = rows
    for (let i = 0; i < rows.length; i++) {
      dateArr.push({
        text: rows[i].date,
        value: rows[i].date
      })
    }
    mysql.query(`select * from doc`, (err, rows, fields) => {
      if (err) {
        throw err
      }
      for (let i = 0; i < rows.length; i++) {
        docArr.push({
          text: rows[i].name,
          value: rows[i].name
        })
      }
      mysql.query(`select * from dep`, (err, rows, fields) => {
        if (err) {
          throw err
        }
        for (let i = 0; i < rows.length; i++) {
          depArr.push({
            text: rows[i].name,
            value: rows[i].name
          })
        }
        mysql.query(`select * from user where kind='med'`, (err, rows, fields) => {
          if (err) {
            throw err
          }
          for (let i = 0; i < rows.length; i++) {
            pillArr.push({
              text: rows[i].name,
              value: rows[i].name
            })
          }
          mysql.query(`select * from user where kind='cou'`, (err, rows, fields) => {
            if (err) {
              throw err
            }
            for (let i = 0; i < rows.length; i++) {
              counterArr.push({
                text: rows[i].name,
                value: rows[i].name
              })
            }
            res.send({
              dateRecords,
              pillArr,
              counterArr,
              dateRecords,
              docArr,
              depArr,
              dateArr
            })
          })
        })
      })
    })
  })
})

router.post('/getDateRecords', (req, res, next) => {
  const body = req.body
  let dateRecords = []
  let pillArr = []
  let counterArr = []
  mysql.query(`select * from patient where name='${body.name}' and state=1`, (err, rows, fields) => {
    if (err) {
      throw err
    }
    dateRecords = rows
    mysql.query(`select * from user where kind='med'`, (err, rows, fields) => {
      if (err) {
        throw err
      }
      pillArr = rows
      mysql.query(`select * from user where kind='cou'`, (err, rows, fields) => {
        if (err) {
          throw err
        }
        counterArr = rows
        res.send({
          dateRecords,
          pillArr,
          counterArr
        })
      })
    })
  })
})

router.post('/cancelDate', (req, res, next) => {
  const body = req.body
  mysql.query(`delete from patient where id='${body.id}'`, (err, rows, fields) => {
    if (err) {
      throw err
    }
    res.send({ status: 1 })
  })
})

router.post('/deleteRecord', (req, res, next) => {
  const body = req.body
  mysql.query(`update patient set pat_del=2 where id=${body.id}`, (err, rows, fields) => {
    if (err) {
      throw err
    }
    res.send({ status: 1 })
  })
})

module.exports = router;
