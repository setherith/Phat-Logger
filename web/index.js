var express = require('express');
var mysql = require('mysql');
var jade = require('pug');

var app = express();

var conn = mysql.createConnection({
	host: "localhost",
	user: "phat_user",
	password: "phat_user",
	database: "phat-logger"
});

app.set('view engine', 'pug');

app.use('/public', express.static(__dirname + '/public'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/chart', express.static(__dirname + '/node_modules/chart.js/dist'));

app.get('/', function (req, res) {
	conn.query('select * from log', function(err, rows) {
		if (err) console.log(err);
		var output = '';
		var values = '[';
		var labels = '[';
		rows.forEach(function(r) {
			output += r['datetime'] + ':' + r['value'] + '\n';
			values += r['value'] + ', ';
			labels += "'" + r['datetime'] + "', ";
		});
		res.render('index.pug', { 'rows': output, 
					'values': values + ']',
				 	'labels': labels + ']' });
	});
});

app.listen(3000, function() {
	console.log('Web App started @ ' + new Date() + '\nConnect -> localhost:3000');
});