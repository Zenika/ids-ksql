#!/bin/sh

apt-get update -qq
apt-get install -qy avahi-daemon
apt-get install -qy openjdk-11-jdk-headless nginx

wget -qO- https://deb.nodesource.com/setup_10.x | bash -
apt install -qy nodejs

cp /vagrant/app.service /etc/systemd/system
systemctl daemon-reload
systemctl enable app.service
systemctl start app.service
