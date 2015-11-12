var express = require('express');
var moment = require('moment');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var dbName = 'DB.db';

/* POST */
router.post('/', function(req, res, next) {
	var db = new sqlite3.Database('DB.db');

	db.serialize(function() {
		var stmt = db.prepare('INSERT INTO data (date, address, temperature) VALUES (?, ?, ?)');

            req.query.temps.forEach(function(val){
                stmt.run([moment().format("YYYY-MM-DD HH:mm:ss"), val.id, val.temp]);
            })

            stmt.finalize();
		})

	db.close();

	res.json({});
});


router.get('/', function(req, res, next) {
	var db = new sqlite3.Database(dbName);
	var data = [];

    where = " WHERE DATE(date) BETWEEN '" + moment().format("YYYY-MM-DD") + "' AND '" + moment().format("YYYY-MM-DD") + "'";
	where = "";

    var sql = 'SELECT * FROM data' + where + ' ORDER BY date DESC';
	console.log("run " + sql)
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
