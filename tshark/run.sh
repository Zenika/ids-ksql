#!/usr/bin/env sh

INTERFACE=${INTERFACE:-$(tshark -D | head -1 | cut -f2 -d' ')}
LINES_BY_FILE=${LINES_BY_FILE:-100}
TIMESTAMP=$(date '+%s')
exec tshark -l -n -T ek -i $INTERFACE | grep -v '^{"index":' | split -l ${LINES_BY_FILE} - /logs/packets-${TIMESTAMP}-
