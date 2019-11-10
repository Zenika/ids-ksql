#!/bin/sh

apt-get update -qq
apt-get install -qy avahi-daemon
apt-get install -qy nmap sqlmap python3 python3-scapy netcat-openbsd slowhttptest
