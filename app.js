var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var http = require('http')

var systemRouter = require('./routes/system');
var profileRouter = require('./routes/profile');
var medicineRouter = require('./routes/medicine');
var newsRepresentRouter = require('./routes/newsRepresent');
var newsRouter = require('./routes/news');
var patientRouter = require('./routes/patient');
var doctorRouter = require('./routes/doctor');
var moneyRouter = require('./routes/money');
var statisticsRouter = require('./routes/statistics');
var dialogRouter = require('./routes/dialog');
var symptomRouter = require('./routes/symptom');

var mysql = require('./model/connect');
var utils = require('./utils/utils')

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/system', systemRouter);
app.use('/profile', profileRouter);
app.use('/medicine', medicineRouter);
app.use('/representNews', newsRepresentRouter);
app.use('/news', newsRouter);
app.use('/patient', patientRouter);
app.use('/doctor', doctorRouter);
app.use('/money', moneyRouter);
app.use('/statistics', statisticsRouter);
app.use('/dialog', dialogRouter);
app.use('/symptom', symptomRouter);

var server = http.createServer(app);
var io = require('socket.io')(server);
var timer = null

io.on('connection', function (socket) {
  socket.on('sendMes', function (data) {
    // if (timer) {
    //   clearInterval(timer)
    // }
    mysql.query(`insert into communication(receiver, sender, dialog, readed, date) values('${data.receiver}', '${data.sender}', '${data.dialog}', 1, '${data.date}')`)
    // timer = setInterval(() => {
    //   mysql.query(`select * from communication where receiver='${data.sender}' and sender='${data.receiver}' and readed='n'`, (err, rows, fields) => {
    //     if (err) {
    //       throw err
    //     }
    //     if (rows.length) {
    //       socket.emit('receiveMes', { data: rows, sender: data.receiver })
    //       // socket.emit('updateInfoNum', { name: data.sender, num: rows.length, status: 'a' })

    //       mysql.query(`update communication set readed='y' where receiver='${data.sender}' and sender='${data.receiver}' and readed='n'`)

    //       utils.getInfoNum(socket, 'private')
    //     }
    //   })
    // }, 1000)
    utils.getInfoNum(socket, 'public')
  })
  socket.on('reqMes', (data) => {
    // console.log(data)
    mysql.query(`select * from communication where sender='${data.sender}' and receiver='${data.receiver}' and readed='n'`, (err, rows, fields) => {
      if (err) {
        throw err
      }
      mysql.query(`update communication set readed='y' where sender='${data.sender}' and receiver='${data.receiver}' and readed='n'`)
      socket.emit('reqMes', { data: rows, sender: data.sender })

      // socket.emit('updateInfoNum', { name: data.sender, num: 0, status: 'm' })
      utils.getInfoNum(socket, 'private')

      // timer = setInterval(() => {
      //   mysql.query(`select * from communication where receiver='${data.receiver}' and sender='${data.sender}' and readed='n'`, (err, rows, fields) => {
      //     if (err) {
      //       throw err
      //     }
      //     if (rows.length) {
      //       socket.emit('receiveMes', { data: rows, sender: data.sender })
      //       // socket.emit('updateInfoNum', { name: data.sender, num: rows.length, status: 'a' })

      //       mysql.query(`update communication set readed='y' where receiver='${data.receiver}' and sender='${data.sender}' and readed='n'`)
      //       utils.getInfoNum(socket, 'private')
      //     }
      //   })
      // }, 1000)
    })
  })
  socket.on('getInfoNum', data => {
    utils.getInfoNum(socket, 'private')
  })
})

server.listen(4000);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
