var express = require('express');
var router = express.Router();

var mysql = require('mysql')
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodedb'
})

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL!");

});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
