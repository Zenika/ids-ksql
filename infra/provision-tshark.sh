#!/bin/sh

export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -qy \
        avahi-daemon \
        software-properties-common

add-apt-repository -y ppa:wireshark-dev/stable

apt-get install -qy \
        tshark


cp /vagrant/tshark.service /etc/systemd/system
systemctl daemon-reload
systemctl enable tshark.service
systemctl start tshark.service
