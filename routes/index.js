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
	
	db.serialize(function(){							
		db.each('SELECT date, address, temperature FROM data WHERE address = "286329e006000017" ORDER BY date DESC LIMIT 10', function(err, row){				
			data.push(row);
		}, function(){
			db.close();		
			res.json(data);
		});
	})
	
	
});

module.exports = router;
