var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'hgl2000',
  database: 'myhis'
})

connection.connect()

module.exports = connection