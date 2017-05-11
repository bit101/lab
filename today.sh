#! /bin/bash

TODAY=`date +"%y%m%d"`

http-server & google-chrome http://localhost:8080/dev/$TODAY.html
