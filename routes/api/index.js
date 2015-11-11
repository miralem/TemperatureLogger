var express = require('express');
var moment = require('moment');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

var dbName = 'data.db';

var fs = require("fs");
var file = "./" + dbName;
var exists = fs.existsSync(file);


/* POST */
router.post('/', function(req, res, next) {
	var db = new sqlite3.Database(dbName);
	if(!req.query.temps)
		return;

	db.serialize(function() {
		if(!exists) {
			db.run('CREATE TABLE data(date DATETIME NOT NULL, address VARCHAR(64) NOT NULL, temperature REAL NOT NULL);');
		}

		var stmt = db.prepare('INSERT INTO data (date, address, temperature) VALUES (?, ?, ?)');

		req.query.temps.forEach(function(val){
			stmt.run([moment().format("YYYY-MM-DD HH:mm:ss"), val.id, val.temp]);
		})

		stmt.finalize();
	});

	db.close();

	res.json({});
});

router.get('/', function(req, res, next) {
	var db = new sqlite3.Database(dbName);
	var data = [];

    var where = '';

    if(req.query.date){
        where += " WHERE DATE(date) BETWEEN '" + req.query.date + "' AND '" + req.query.date + "'";
    }

    var sql = 'SELECT date, address, temperature FROM data' + where + ' ORDER BY date DESC';
    console.log(sql)

	db.serialize(function(){
		db.each(sql, function(err, row){
			data.push(row);
		}, function(){
			db.close();
			res.json(data);
		});
	})
});

router.get('/', function(req, res, next) {
	var db = new sqlite3.Database(dbName);
	var data = [];

    where = " WHERE DATE(date) BETWEEN '" + moment().format("YYYY-MM-DD") + "' AND '" + moment().format("YYYY-MM-DD") + "'";


    var sql = 'SELECT * FROM data' + where + ' ORDER BY date DESC GROUP BY address';

	db.serialize(function(){
		db.each(sql, function(err, row){
			data.push(row);
		}, function(){
			db.close();
			res.json(data);
		});
	})
});

module.exports = router;
