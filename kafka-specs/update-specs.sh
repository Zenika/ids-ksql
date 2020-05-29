#!/usr/bin/env bash

BROKER_LIST=$*
for broker in $BROKER_LIST; do
    echo "Waiting for $broker"
    ./wait-for-it.sh $broker -- echo "$broker up"
done

/kafka-specs-*/bin/kafka-specs --bootstrap-server ${BROKER_LIST[0]} \
                               --entity-type topics \
                               --execute \
                               --create \
                               --file $KAFKA_SPECS_YAML \
                               --yes
