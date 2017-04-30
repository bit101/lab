#! /bin/bash

TODAY=`date +"%y%m%d"`
TOMORROW=`date --date="tomorrow" +"%y%m%d"`

mv dev/$TODAY.html dailies/
mv dev/$TODAY.js dailies/
mv dev/$TODAY.png thumbs/

./atom.sh
vim feed.xml
vim index.json
vim dailies/$TODAY.html
vim dailies/$TOMORROW.html
http-server & google-chrome http://localhost:8080
