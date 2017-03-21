var express = require('express');
var mysql = require('mysql');
var jade = require('jade');

var app = express();

app.set('view engine', 'jade');

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.render('index.jade');
});

app.listen(3000, function() {
	console.log('Web App started @ ' + new Date() + '\nConnect -> localhost:3000');
});