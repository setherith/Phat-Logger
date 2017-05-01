var mysql = require('mysql');

var conn = mysql.createPool({
	host: "localhost",
	user: "phat_user",
	password: "phat_user",
	database: "phat-logger"
});

module.exports.getEverything = function(callback) {
    conn.query('select * from log', function(err, rows) { // where datetime > sysdate() - interval 30 minute
		if (err) console.log(err);
		var pressures = '';
		var temperatures = '';
		var labels = '';
		rows.forEach(function(r) {
			pressures += r['pres'] + ', ';
			temperatures += r['temp'] + ', ';
			labels += "'" + toDate(r['datetime']) + "', ";
		});
		callback({ 'temperatures': temperatures, 'pressures': pressures, 'labels': labels });
	});
};

module.exports.avgTemps = function(callback) {
    conn.query('select avg(temp), min(temp), max(temp), count(*), date(datetime) from log group by day(datetime) order by datetime', function(err, rows) {
		if (err) console.log(err);
		callback(rows);
	});
};

module.exports.avgPres = function(callback) {
    conn.query('select avg(pres), min(pres), max(pres), count(*), date(datetime) from log group by day(datetime) order by datetime', function(err, rows) {
		if (err) console.log(err);
		callback(rows);
	});
};

module.exports.getPastHours = function(hours, callback) {
    conn.query('select * from log where datetime > sysdate() - interval ' + hours + ' hour', function(err, rows) {
		if (err) console.log(err);
		var pressures = '';
		var temperatures = '';
		var labels = '';
		rows.forEach(function(r) {
			pressures += r['pres'] + ', ';
			temperatures += r['temp'] + ', ';
			labels += "'" + toDate(r['datetime']) + "', ";
		});
		callback({ 'temperatures': temperatures, 'pressures': pressures, 'labels': labels });
	});
};

module.exports.getPastDay = function(callback) {
    conn.query('select * from log where datetime > sysdate() - interval 24 hour', function(err, rows) {
		if (err) console.log(err);
		var pressures = '';
		var temperatures = '';
		var labels = '';
		rows.forEach(function(r) {
			pressures += r['pres'] + ', ';
			temperatures += r['temp'] + ', ';
			labels += "'" + toDate(r['datetime']) + "', ";
		});
		callback({ 'temperatures': temperatures, 'pressures': pressures, 'labels': labels });
	});
};

module.exports.getEarliestDate = function(callback) {
    conn.query('select min(datetime) as `min` from log', function(err, rows) {
        if (err) console.log(err);
        callback(new Date(rows[0]['min']));
    });
};

module.exports.getLatestDate = function(callback) {
    conn.query('select max(datetime) as `max` from log', function(err, rows) {
        if (err) console.log(err);
        callback(new Date(rows[0]['max']));
    });
};

module.exports.getDateRange = function(callback) {
    conn.query('select date(datetime) as `date` from log group by day(datetime)', function(err, rows) {
        if (err) console.log(err);
        callback(rows);
    });
};

module.exports.getAveragePerDay = function(day, callback) {
	conn.query('select avg(temp) from log where day(datetime) = day(' + new Date(day) + ')', function(err, rows) {
		if (err) console.log(err);
		callback(rows);
	});
};

function toDate(dbdate) {
	var date = new Date(dbdate);
	var hour = date.getHours();
	var min = date.getMinutes();
	if (hour.toString().length < 2) hour = '0' + hour;
	if (min.toString().length < 2) min = '0' + min;
	return hour + ':' + min;
};