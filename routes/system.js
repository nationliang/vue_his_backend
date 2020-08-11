var express = require('express');
var router = express.Router();

var mysql = require('../model/connect')

router.post('/user/:operate', function(req, res, next) {
  const body = req.body
  // console.log(body)
  if (req.params.operate === 'delete') {
    mysql.query(`delete from user where id = ${ body.id }`, (err, rows, next) => {
      if (err) {
        throw err
      }
      mysql.query(`delete from doc where name = '${ body.name }'`, (err, rows, next) => {
        if (err) {
          throw err
        }
        res.send({ scode: 1 })
      })
    })
  } else if (req.params.operate === 'list') {
    mysql.query("select * from user", (err, rows, fields) => {
      if (err) {
        throw err
      }
      res.send(rows)
    })
  } else if (req.params.operate === 'add') {
    mysql.query(`select * from user where name='${body.name}'`, (err, rows, fields) => {
      if (err) {
        throw err
      }
      if (rows.length) {
        res.send({ scode: 2 })//用户名已存在
      } else {
        mysql.query(`insert into user(name, kind, sex, date, password) values('${ body.name }', ${ body.kind }, ${ body.sex }, '${ body.date }', '${body.password}')`, (err, rows, next) => {
          if (err) {
            throw err
          }
          res.send({ scode: 1 })
        })        
      }
    })
  }
});

router.post('/dep/:operate', function(req, res, next) {
  const body = req.body
  if (req.params.operate === 'delete') {
    mysql.query(`delete from dep where id = ${ body.id }`, (err, rows, next) => {
      if (err) {
        throw err
      }
      mysql.query(`select * from doc where dep='${body.name}'`, (err, rows, fields) => {
        if (err) {
          throw err
        }
        // console.log(rows)
        mysql.query(`delete from user where name='${rows[0].name}'`)
        mysql.query(`delete from doc where dep='${body.name}'`, (err, rows, fields) => {
          if (err) {
            throw err
          }
        })
      })
      mysql.query(`delete from symptom where dep='${body.name}'`)
      res.send({ scode: 1 })
    })
  } else if (req.params.operate === 'list') {
    mysql.query("select * from dep", (err, rows, fields) => {
      if (err) {
        throw err
      }
      res.send(rows)
    })
  } else if (req.params.operate === 'add') {
    mysql.query(`select * from dep where name='${body.name}'`, (err, rows, fields) => {
      if (err) {
        throw err
      }
      if (rows.length) {
        res.send({ scode: 2 })
      } else {
        mysql.query(`insert into dep(name, mem_num) values('${ body.name }', 0)`, (err, rows, next) => {
          if (err) {
            throw err
          }
          mysql.query(`insert into plan(dep, time) values('${body.name}', '上午')`)
          mysql.query(`insert into plan(dep, time) values('${body.name}', '下午')`)
          mysql.query(`insert into plan(dep, time) values('${body.name}', '晚上')`)
          res.send({ scode: 1 })
        })        
      }
    })
  }
});

router.post('/doc/:operate', function(req, res, next) {
  const body = req.body
  if (req.params.operate === 'delete') {
    mysql.query(`delete from doc where id = ${ body.id }`, (err, rows, next) => {
      if (err) {
        throw err
      }
      mysql.query(`delete from user where name = '${ body.name }'`, (err, rows, next) => {
        if (err) {
          throw err
        }
        res.send({ scode: 1 })
      })
    })
  } else if (req.params.operate === 'list') {
    mysql.query("select * from doc", (err, rows, fields) => {
      if (err) {
        throw err
      }
      res.send(rows)
    })
  } else if (req.params.operate === 'add') {
    mysql.query(`select * from doc where name='${body.name}'`, (err, rows, fields) => {
      if (err) {
        throw err
      }
      if (rows.length) {
        res.send({ scode: 2 })
      } else {
        mysql.query(`insert into doc(name, sex, rank, dep) values('${ body.name }', ${body.sex}, ${body.rank}, '${body.dep}')`, (err, rows, next) => {
          if (err) {
            throw err
          }
          mysql.query(`insert into user (name, kind, sex, date, password) values('${body.name}', 2, '${body.sex}', '${body.date}', '${body.password}')`)
          res.send({ scode: 1 })
        })
      }
    })
  }
});

router.post('/check/:operate', function(req, res, next) {
  const body = req.body
  if (req.params.operate === 'delete') {
    mysql.query(`delete from checks where id = ${ body.id }`, (err, rows, next) => {
      if (err) {
        throw err
      }
      res.send({ scode: 1 })
    })
  } else if (req.params.operate === 'list') {
    mysql.query("select * from checks", (err, rows, fields) => {
      if (err) {
        throw err
      }
      res.send(rows)
    })
  } else if (req.params.operate === 'add') {
    mysql.query(`select * from checks where name='${body.name}'`, (err, rows, fields) => {
      if (err) {
        throw err
      }
      if (rows.length) {
        res.send({ scode: 2 })
      } else {
        mysql.query(`insert into checks(name, price, num) values('${ body.name }', ${body.price}, 0)`, (err, rows, next) => {
          if (err) {
            throw err
          }
          res.send({ scode: 1 })
        })
      }
    })
  }
});

router.post('/newsManage/:operate', function(req, res, next) {
  const body = req.body
  if (req.params.operate === 'delete') {
    mysql.query(`delete from news where id = ${ body.id }`, (err, rows, next) => {
      if (err) {
        throw err
      }
      res.send({ scode: 1 })
    })
  } else if (req.params.operate === 'list') {
    mysql.query("select * from news", (err, rows, fields) => {
      if (err) {
        throw err
      }
      res.send(rows)
    })
  } else if (req.params.operate === 'add') {
    mysql.query(`select * from news where title='${body.title}'`, (err, rows, fields) => {
      if (err) {
        throw err
      }
      if (rows.length) {
        res.send({ scode: 2 })
      } else {
        mysql.query(`insert into news(title, kind, author, editor, source, date, content) values('${ body.title }', '${ body.kind }', '${body.author}', '${body.editor}', '${body.source}', '${body.date}', '${body.content}')`, (err, rows, next) => {
          if (err) {
            throw err
          }
          res.send({ scode: 1 })
        })
      }
    })
  }
});

router.post('/historyManage/:operate', function(req, res, next) {
  const body = req.body
  if (req.params.operate === 'delete') {
    mysql.query(`delete from patient where id = ${ body.id }`, (err, rows, next) => {
      if (err) {
        throw err
      }
      mysql.query(`delete from pat_rec where pat_id=${body.id}`)
      mysql.query(`delete from pat_check where pat_id=${body.id}`)
      mysql.query(`delete from pat_med where pat_id=${body.id}`)
      res.send({ scode: 1 })
    })
  } else if (req.params.operate === 'list') {
    mysql.query("select * from patient", (err, rows, fields) => {
      if (err) {
        throw err
      }
      res.send(rows)
    })
   } //else if (req.params.operate === 'add') {
  //   mysql.query(`insert into history(patient, doctor, dep, kind,mdemag, counter, date, fee, doc_delete, pat_delete) values('${ body.patient }', '${ body.doctor }', '${body.dep}', '${body.kind}', '${body.medmag}', '${body.counter}', '${body.date}', '${body.fee}', '${body.doc_delete}', '${body.pat_delete}')`, (err, rows, next) => {
  //     if (err) {
  //       throw err
  //     }
  //     res.send({ scode: 1 })
  //   })
  // }
});

router.post('/darrange/:operate', (req, res, next) => {
  const body = req.body
  if (req.params.operate === 'queryDepDoc') {
    mysql.query(`select * from doc where dep='${body.kind}'`, (err, rows, fields) => {
      if (err) {
        throw err
      }
      res.send(rows)
    })
  } else if (req.params.operate === 'add') {
    console.log(body)
    for (let i = 0; i < body.arrangeSets.length; i++) {
      mysql.query(`update plan set date='${body.arrangeSets[i].date}', mon='${body.arrangeSets[i].mon}', tue='${body.arrangeSets[i].tue}', wedn='${body.arrangeSets[i].wedn}', thur='${body.arrangeSets[i].thur}', fri='${body.arrangeSets[i].fri}', sat='${body.arrangeSets[i].sat}', sun='${body.arrangeSets[i].sun}', reference='${body.reference}', date='${body.arrangeSets[i].date}' where dep='${body.arrangeSets[i].dep}'`, (err, rows, fields) => {
        if (err) {
          throw err
        }
      })
    }
    res.send({ scode: 1 })
  } else if (req.params.operate === 'list') {
    mysql.query(`select * from plan where dep='${body.dep}'`, (err, rows, fields) => {
      if (err) {
        throw err
      }
      for(let i = 0; i < rows.length; i++) {
        if (rows[i].reference !== body.reference) {
          rows[i].mon = ''
          rows[i].tue = ''
          rows[i].wedn = ''
          rows[i].thur = ''
          rows[i].fri = ''
          rows[i].sat = ''
          rows[i].sun = ''
        }
      }
      res.send(rows)
    })
  }
})

router.post('/statistics/:operation', (req, res, next) => {
  if (req.params.operation === 'list') {
    let statisticsSets = [],
        filter_date = []
        item = {
          text: '',
          value: ''
        },
        records = []
    mysql.query(`select * from statistics`, (err, rows, fields) => {
      if (err) {
        throw err
      }
      statisticsSets = rows
      for (let i = 0; i < rows.length; i++) {
        if (records.indexOf(rows[i].date) === -1) {
          records.push(rows[i].date)
          item.text = rows[i].date
          item.value = rows[i].date
          filter_date.push(item)
          item = {
            text: '',
            value: ''
          }
        }
      }
      res.send({ statisticsSets, filter_date })
    })
  } else if (req.params.operation === 'add') {
    const body = req.body
    mysql.query(`insert into statistics(visitor, ip, address, date) values('${body.visitor}', '${body.ip}', '${body.address}', '${body.date}')`, (err, rows, fields) => {
      if (err) {
        throw err
      }
      res.send({ scode: 1 })
    })
  } else if (req.params.operation === 'del') {
    const body = req.body
    mysql.query(`delete from statistics where id=${body.id}`, (err, rows, fields) => {
      if (err) {
        throw err
      }
      res.send({ scode: 1 })
    })
  }
})

module.exports = router;
