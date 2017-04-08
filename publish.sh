#! /bin/bash

YYMMDD=`date -u +"%y%m%d"`

mv dev/$YYMMDD.html dailies/
mv dev/$YYMMDD.js dailies/
mv dev/$YYMMDD.png thumbs/

./atom.sh
