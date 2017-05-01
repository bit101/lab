#! /bin/bash

TODAY=`date +"%y%m%d"`
YESTERDAY=`date --date="yesterday" +"y%m%d"`

mv dev/$TODAY.html dailies/
mv dev/$TODAY.js dailies/
mv dev/$TODAY.png thumbs/

./atom.sh
vim feed.xml
vim index.json
vim dailies/$TODAY.html
vim dailies/$YESTERDAY.html
http-server & google-chrome http://localhost:8080
