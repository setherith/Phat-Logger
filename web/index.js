var express = require('express');
var db = require('./database.js');
var jade = require('pug');

var app = express();

app.set('view engine', 'pug');

app.use('/public', express.static(__dirname + '/public'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/chart', express.static(__dirname + '/node_modules/chart.js/dist'));

app.get('/', function (req, res) {
	db.getPastHours(3, function(results) {
		res.render('index.pug', results);
	});
});

app.get('/average', function(req, res) {
	db.avgTemps(function(temp) {
		db.avgPres(function(pres) {
			res.render('average.pug', {'temp': temp, 'pres': pres});
		});
	});
});

app.listen(3000, function() {
	console.log('Web App started @ ' + new Date() + '\nConnect -> localhost:3000');
});