#!/usr/bin/env bash

echo "Obtaining token..."
token=$(curl -s -X POST \
             -H 'Content-Type: application/json' \
             http://web.local:8080/api/authenticate \
             -d '{"password": "user", "username": "user"}' \
            | grep id_token \
            | sed 's/{"id_token":"\(.*\)"}/\1/')

sleep 1

for i in $(seq 45); do
    echo "Querying employees... $i"
    curl -s -H "Authorization: Bearer $token" http://web.local:8080/api/employees
    echo
    sleep 1
done
