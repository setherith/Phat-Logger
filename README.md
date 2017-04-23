# pHAT-Logger

* About
The pHAT-Logger is an application that takes input from the enviro pHAT module via the GPIO headers on a Raspberry Pi. It then sends the data to a MySQL database for later processing.
A Node server will pick up the values and use Chart.js to present the content on a web application.

* Code
- Test logging function written in Java
- Actual logging function written in Python
- Display applicaiton will be written in Node / Express / Jade

* Deploy
- Clone Git (git clone https://github.com/setherith/phat-logger.git)
- Install MySql Server (sudo apt-get install mysql-server)
- Deploy script (mysql -u root -p < phat-logger\ setup.sql)
- Test: Run Jar (java -jar phat-logger-v1.0.jar)
- Run: python3 /python/poll.py
