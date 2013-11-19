#!/bin/bash
#echo "Playing: $1"
#echo
#omxplayer $(youtube-dl -g -f 18 "$1")
file=`youtube-dl -g -o "%(id)s.%(ext)s" -f 18 "$1"`
omxplayer -r "$file"
