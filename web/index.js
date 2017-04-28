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
	db.getEverything(function(results) {
		res.render('index.pug', results);
	});
});

app.get('/average', function(req, res) {
	db.getDateRange(function(dates) {
		console.log(dates);
		res.end();
	});
});

app.listen(3000, function() {
	console.log('Web App started @ ' + new Date() + '\nConnect -> localhost:3000');
});