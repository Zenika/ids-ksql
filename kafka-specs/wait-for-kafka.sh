#!/usr/bin/env bash

BROKER_LIST=$*
for broker in $BROKER_LIST; do
    echo "Waiting for $broker"
    wait-for-it.sh $broker -- echo "$broker up"
done
