#!/usr/bin/env bash

INTERFACE=${INTERFACE:-$(tshark -D | head -1 | cut -f2 -d' ')}
TIMESTAMP=$(date '+%s')
exec tshark -l -n -T ek -i $INTERFACE | grep -v '^{"index":' | split -l 100 - /logs/packets-${TIMESTAMP}-
