var express = require('express');
var router = express.Router();

var mysql = require('../model/connect')

router.post('/', function(req, res, next) {
  const body = req.body
  mysql.query(`select * from news where kind='医院要闻' or kind='综合新闻' or kind='病友飞鸿'`, (err, rows, next) => {
    if (err) {
      throw err
    }
    let data = []
    let item = {
      articleTitleArr: []
    }
    for (let i=0; i< rows.length;i++) {
      if (rows[i].kind === '医院要闻') {
        item.topic = '医院要闻',
        item.articleTitleArr.push({
          title: rows[i].title,
          date: rows[i].date
        })
      }
    }
    data.push(item)

    item = {
      articleTitleArr: []
    }
    for (let i=0; i< rows.length;i++) {
      if (rows[i].kind === '综合新闻') {
        item.topic = '综合新闻',
        item.articleTitleArr = []
        item.articleTitleArr.push({
          title: rows[i].title,
          date: rows[i].date
        })
      }
    }
    data.push(item)

    item = {
      articleTitleArr: []
    }
    for (let i=0; i< rows.length;i++) {
      if (rows[i].kind === '病友飞鸿') {
        item.topic = '病友飞鸿',
        item.articleTitleArr = []
        item.articleTitleArr.push({
          title: rows[i].title,
          date: rows[i].date
        })
      }
    }
    data.push(item)

    res.send(data)
  })
});

module.exports = router;