var express = require('express');
var router = express.Router();

var mysql = require('mysql2')
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

router.get('/', function(req, res, next) {
  try {
    var sql = 'select * from product'
    
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
        
        res.json(result);
        
    });
  } catch(e) {            
    res.status(500);
    throw Error('invalid JSON');
  }
});

router.post('/create', function(req, res, next) {  
  try {
    var sql = 'insert into product(name,quantity,price,created) values(?,?,?,?)'
    var values = [
        req.body.hasOwnProperty('name') ? req.body.name : '',
        req.body.hasOwnProperty('quantity') ? req.body.quantity : 0,
        req.body.hasOwnProperty('price') ? req.body.price : 0,
        new Date()
    ]

    con.query(sql, values, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
        
        res.json({
            'status': 'created'
        });
        
    });
  } catch(e) {            
    res.status(500);
    throw Error('invalid JSON');
  }
});

router.post('/update', function(req, res, next) {
  try {
    var sql = 'update product set name=?,quantity=?,price=? where id=?'
    var values = [
        req.body.hasOwnProperty('name') ? req.body.name : '',
        req.body.hasOwnProperty('quantity') ? req.body.quantity : 0,
        req.body.hasOwnProperty('price') ? req.body.price : 0,
        req.body.hasOwnProperty('id') ? req.body.id : 0
    ]

    con.query(sql, values, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
        
        res.json({
            'status': 'updated'
        });
        
    });
  } catch(e) {            
    res.status(500);
    throw Error('invalid JSON');
  }
});

router.get('/delete/:id', function(req, res, next) {
  try {
    var sql = 'delete from product where id=?'
    var values = [              
      req.params.id
    ]
    con.query(sql, values, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
        
        res.json({
            'status': 'deleted'
        });
        
    });
  } catch(e) {            
    res.status(500);
    throw Error('invalid JSON');
  }
});

router.get('/:id', function(req, res, next) {
  try {
    var sql = 'select * from product where id=?'

    var values = [              
      req.params.id
    ]
    
    con.query(sql, values,function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
        
        res.json(result);
        
    });
  } catch(e) {            
    res.status(500);
    throw Error('invalid JSON');
  }
});

module.exports = router;
