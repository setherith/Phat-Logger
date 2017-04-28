var mysql = require('mysql');

var conn = mysql.createPool({
	host: "localhost",
	user: "phat_user",
	password: "phat_user",
	database: "phat-logger"
});

module.exports.getEverything = function(callback) {
    console.log(callback);
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

function toDate(dbdate) {
	var date = new Date(dbdate);
	var hour = date.getHours();
	var min = date.getMinutes();
	if (hour.toString().length < 2) hour = '0' + hour;
	if (min.toString().length < 2) min = '0' + min;
	return hour + ':' + min;
};