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

module.exports.getAveragePerDay = function(callback) {

};

function toDate(dbdate) {
	var date = new Date(dbdate);
	var hour = date.getHours();
	var min = date.getMinutes();
	if (hour.toString().length < 2) hour = '0' + hour;
	if (min.toString().length < 2) min = '0' + min;
	return hour + ':' + min;
};