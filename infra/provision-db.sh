#!/bin/sh

apt-get update -qq
apt-get install -qy avahi-daemon
apt-get install -qy postgresql

sed -i.bak "s/#listen_addresses = 'localhost'/listen_addresses = '*'/g" /etc/postgresql/10/main/postgresql.conf

systemctl restart postgresql
