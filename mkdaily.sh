#! /bin/bash

YYMMDD=$1

if [ -f dev/$YYMMDD.html ];
then
    echo dev/$YYMMDD.html exists
else
    sed "s/YYMMDD/$YYMMDD/" templates/template.html > dev/$YYMMDD.html
fi

if [ -f dev/$YYMMDD.js ];
then
    echo dev/$YYMMDD.js exists
else
    cp templates/template.js dev/$YYMMDD.js
fi