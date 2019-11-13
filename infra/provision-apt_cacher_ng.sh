#!/usr/bin/env bash

apt-get update -qq
apt-get install -qy apt-cacher-ng

sed -i.bak 's!^CacheDir: .*$!CacheDir: /vagrant/cache/apt-cacher-ng!' /etc/apt-cacher-ng/acng.conf
cat <<EOF >> /etc/apt-cacher-ng/acng.conf 
Port:9999
BindAddress: localhost 192.168.33.9
PassThroughPattern: .* # this would allow CONNECT to everything

EOF

mkdir -p /vagrant/cache/apt-cacher-ng
cp /lib/systemd/system/apt-cacher-ng.service /etc/systemd/system/
sed -i '/^\[Service\]/a RestartSec=10' /etc/systemd/system/apt-cacher-ng.service
echo "WantedBy=vagrant.mount" >> /etc/systemd/system/apt-cacher-ng.service

systemctl daemon-reload
systemctl restart apt-cacher-ng

apt-get install -qy avahi-daemon
