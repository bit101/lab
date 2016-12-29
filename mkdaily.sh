#! /bin/bash

YYMMDD=$1

sed "s/YYMMDD/$YYMMDD/" template.html > dev/$YYMMDD.html
cp template.js dev/$YYMMDD.js
