#! /bin/bash

YYMMDD=$1
NEW=$2


if [ -f dev/$NEW.html ];
then
    echo dev/$NEW.html exists
else
    sed "s/$YYMMDD/$NEW/" dev/$YYMMDD.html > dev/$NEW.html
fi

if [ -f dev/$NEW.js ];
then
    echo dev/$NEW.js exists
else
    cp dev/$YYMMDD.js dev/$NEW.js
fi