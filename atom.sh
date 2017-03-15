#! /bin/bash

YYMMDD=$1
DATE=`date -u +"%Y-%m-%eT%H:%M:%S"`
DATE2=`date +"%B %d, %Y"`

sed "s/YYMMDD/$YYMMDD/" templates/atom_entry.template | sed "s/NOW/$DATE/" | sed "s/TODAY/$DATE2/"
