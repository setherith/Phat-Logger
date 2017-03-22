var express = require('express');
var mysql = require('mysql');
var jade = require('pug');

var app = express();

app.set('view engine', 'pug');

app.use('/public', express.static(__dirname + '/public'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'))

app.get('/', function (req, res) {
	res.render('index.pug');
});

app.listen(3000, function() {
	console.log('Web App started @ ' + new Date() + '\nConnect -> localhost:3000');
});