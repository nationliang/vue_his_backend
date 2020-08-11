var express = require('express');
var router = express.Router();

var mysql = require('../model/connect')

router.post('/', function(req, res, next) {
  const body = req.body
  mysql.query(`select * from news`, (err, rows, next) => {
    if (err) {
      throw err
    }
    let data = {
      topic: '新闻分类',
      contentArr: []
    }
    let item = {
      topic: '医院要闻',
      itemCollect: []
    }
    for (let i=0; i< rows.length;i++) {
      if (rows[i].kind === '医院要闻') {
        item.itemCollect.push({
          title: rows[i].title,
          source: rows[i].source,
          author: rows[i].author,
          editor: rows[i].editor,
          date: rows[i].date,
          content: rows[i].content
        })
      }
    }
    data.contentArr.push(item)

    item = {
      topic: '综合新闻',
      itemCollect: []
    }
    for (let i=0; i< rows.length;i++) {
      if (rows[i].kind === '综合新闻') {
        item.itemCollect.push({
          title: rows[i].title,
          source: rows[i].source,
          author: rows[i].author,
          editor: rows[i].editor,
          date: rows[i].date,
          content: rows[i].content
        })
      }
    }
    data.contentArr.push(item)

    item = {
      topic: '病友飞鸿',
      itemCollect: []
    }
    for (let i=0; i< rows.length;i++) {
      if (rows[i].kind === '病友飞鸿') {
        item.itemCollect.push({
          title: rows[i].title,
          source: rows[i].source,
          author: rows[i].author,
          editor: rows[i].editor,
          date: rows[i].date,
          content: rows[i].content
        })
      }
    }
    data.contentArr.push(item)

    item = {
      topic: '杏林人物',
      itemCollect: []
    }
    for (let i=0; i< rows.length;i++) {
      if (rows[i].kind === '杏林人物') {
        item.itemCollect.push({
          title: rows[i].title,
          source: rows[i].source,
          author: rows[i].author,
          editor: rows[i].editor,
          date: rows[i].date,
          content: rows[i].content
        })
      }
    }
    data.contentArr.push(item)

    item = {
      topic: '员工文苑',
      itemCollect: []
    }
    for (let i=0; i< rows.length;i++) {
      if (rows[i].kind === '员工文苑') {
        item.itemCollect.push({
          title: rows[i].title,
          source: rows[i].source,
          author: rows[i].author,
          editor: rows[i].editor,
          date: rows[i].date,
          content: rows[i].content
        })
      }
    }
    data.contentArr.push(item)

    item = {
      topic: '领导论坛',
      itemCollect: []
    }
    for (let i=0; i< rows.length;i++) {
      if (rows[i].kind === '领导论坛') {
        item.itemCollect.push({
          title: rows[i].title,
          source: rows[i].source,
          author: rows[i].author,
          editor: rows[i].editor,
          date: rows[i].date,
          content: rows[i].content
        })
      }
    }
    data.contentArr.push(item)

    res.send(data)
  })
});

module.exports = router;