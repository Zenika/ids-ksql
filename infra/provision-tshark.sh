#!/bin/sh

apt-get update -qq
apt-get install -qy avahi-daemon
apt-get install -qy apt-transport-https \
        ca-certificates\
        curl \
        gnupg-agent \
        software-properties-common \
        git

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -

add-apt-repository -y "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

apt-get install -qy docker-ce docker-ce-cli containerd.io

groupadd docker

usermod -aG docker vagrant

git clone https://github.com/Zenika/ids-ksql.git

cd ids-ksql/tshark

docker build -t tshark .

cp /vagrant/tshark.service /etc/systemd/system
systemctl daemon-reload
systemctl enable tshark.service
systemctl start tshark.service
