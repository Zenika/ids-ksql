#!/usr/bin/env bash

token=$(curl -s -X POST \
             -H 'Content-Type: application/json' \
             http://web.local:8080/api/authenticate \
             -d '{"password": "admin", "username": "admin"}' \
            | grep id_token \
            | sed 's/{"id_token":"\(.*\)"}/\1/')

sleep 1

curl -s -H "Authorization: Bearer $token" http://web.local:8080/management/jhimetrics
