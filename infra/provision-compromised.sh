#!/bin/sh

apt-get update -qq
apt-get install -qy avahi-daemon
apt-get install -qy nmap sqlmap python3 python3-scapy netcat-openbsd slowhttptest libio-socket-ssl-perl

echo '* *    * * *   vagrant   /vagrant/simulate-activity.sh' >> /etc/crontab

git clone https://github.com/llaera/slowloris.pl /home/vagrant/slowloris.pl
