"""
Written By: Shane Pudner
Date: 23/04/2017
A module to log the pressure and temperature of the Enviro-pHAT
"""

import time
from datetime import datetime

import pymysql
from envirophat import weather

CONN = pymysql.connect(host='localhost', \
				database='phat-logger', \
				user='phat_user', \
				passwd='phat_user')
CONN.autocommit(True)

CUR = CONN.cursor()

SECONDS = float(input("How many seconds beween polls? "))

try:
    while True:
        TEMP = '%.1f' % weather.temperature()
        PRES = '%.1f' % (weather.pressure() / 100) # Converts to hPa
        print("Time / Date: " + str(datetime.now()))
        print("Temperature: " + TEMP)
        print("Pressure: " + PRES)
        CUR.execute('call log(' + TEMP + ', ' + PRES +')')
        print("Logged...", "\t\t (Ctrl + C to Exit)")
        print("===============================================================")
        time.sleep(SECONDS)
except KeyboardInterrupt:
    print("Cleaning up...")
    CUR.close()
    CONN.close()
    print("Exiting...")
