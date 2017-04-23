from envirophat import weather
from datetime import datetime
import time
import pymysql

conn = pymysql.connect(host='localhost', database='phat-logger', user='phat_user', passwd='phat_user')
conn.autocommit(True)

cur = conn.cursor()

seconds = float(input("How many seconds beween polls? "))

try:
	while(True):
		temp = '%.2f' % weather.temperature()
		pres = '%.2f' % weather.pressure()
		print("Time / Date: " + str(datetime.now()))
		print("Temperature: " + temp)
		print("Pressure: " + pres)
		cur.execute('call log(' + temp + ', ' + pres +')')
		print("Logged...", "\t\t (Ctrl + C to Exit)")
		print("===============================================================")
		time.sleep(seconds)
except KeyboardInterrupt:
	print("Cleaning up...");
	cur.close()
	conn.close()
	print("Exiting...")

