from envirophat import weather
import time
import pymysql

conn = pymysql.connect(host='localhost', database='phat-logger', user='phat_user', passwd='phat_user')
conn.autocommit(True)

cur = conn.cursor()

while(True):
	temp = weather.temperature()
	print("Logging: " + '%.5f' % temp)
	cur.execute('call log(' + '%.5f' % temp + ')')
	time.sleep(60)
cur.close()
conn.close()
