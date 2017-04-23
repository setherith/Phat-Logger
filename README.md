# pHAT-Logger

About
-----
The pHAT-Logger is an application that takes input from the enviro pHAT module via the GPIO headers on a Raspberry Pi. It then sends the data to a MySQL database for later processing.
A Node server will pick up the values and use Chart.js to present the content on a web page.

When you have the code working correctly it should look like this:

![alt text](https://github.com/setherith/Phat-Logger/blob/master/artwork/publish/showcase.png "Results Screen")

Code
----
- Logging function written in Python
- Display written in Node / Express / Jade
- Test logging function written in Java

Deploy
------
- Clone Git (git clone https://github.com/setherith/phat-logger.git)
- Install MySql Server (sudo apt-get install mysql-server)
- Deploy script (mysql -u root -p < phat-logger\ setup.sql)
- Test: Run Jar (java -jar phat-logger-v1.0.jar)
- Install Python libraries (sudo pip3 install envirophat)
- Run: python3 /python/poll.py
