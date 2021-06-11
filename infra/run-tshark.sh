#!/usr/bin/env bash

OUTDIR=${OUTDIR:-/var}
INTERFACE=${INTERFACE:-$(tshark -D | head -1 | cut -f2 -d' ')}
LINES_BY_FILE=${LINES_BY_FILE:-100}
TIMESTAMP=$(date '+%s')

function better_split {
    filenum=0
    counter=0
    limit=$LINES_BY_FILE
    output="$OUTDIR/logs/packets-${TIMESTAMP}-$(printf "%09d" $filenum)"

    while read -r LINE
    do
        counter=$(( counter + 1 ))
        
        if [[ 1 == $(( counter >= limit )) ]]
        then
            mv $output.tmp $output.ok
            filenum=$(( filenum + 1 ))
            counter=0
            output="$OUTDIR/logs/packets-${TIMESTAMP}-$(printf "%09d" $filenum)"
        fi
        
        echo "$LINE" >> $output.tmp
    done
}

exec tshark -l -n -T ek -i $INTERFACE | grep -v '^{"index":' | better_split
