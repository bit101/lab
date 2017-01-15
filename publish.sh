#! /bin/bash

YYMMDD=$1

cp templates/template.js dev/$YYMMDD.js
mv dev/$YYMMDD.html dailies/
mv dev/$YYMMDD.js dailies/
mv dev/$YYMMDD.png thumbs/