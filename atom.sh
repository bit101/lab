#! /bin/bash

YYMMDD=`date -u +"%y%m%d"`
DATE=`date -u +"%Y-%m-%dT%H:%M:%S"`
DATE2=`date +"%B %d, %Y"`

sed "s/YYMMDD/$YYMMDD/" templates/atom_entry.template | sed "s/NOW/$DATE/" | sed "s/TODAY/$DATE2/"
