#! /bin/bash

YYMMDD=$1

sed "s/YYMMDD/$YYMMDD/" templates/template.html > dev/$YYMMDD.html
cp templates/template.js dev/$YYMMDD.js
