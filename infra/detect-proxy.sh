#!/bin/bash
try_proxies=(
192.168.33.9:9999
)
for proxy in "${try_proxies[@]}"; do
    if nc -z ${proxy/:/ }; then
        proxy=http://$proxy/
        echo "$proxy"
        exit
    fi
done
echo DIRECT
