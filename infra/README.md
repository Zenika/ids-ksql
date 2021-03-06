# Virtual infra for IDS-Kafka demo

| IP            | Server                       |
|:--------------|:-----------------------------|
| 192.168.33.10 | tshark                       |
| 192.168.33.11 | web (nginx on port 80)       |
| 192.168.33.12 | db (postgresql on port 5432) |
| 192.168.33.66 | compromised                  |
|               |                              |

```
+--------------------------------+                    +------------------VAGRANT--------------------+
|                                |                    |                                             |
|               +------------+   |  +-------------+   | +-------------+             +-------------+ |
|               |KAFKA       |   |  |Shared       |   | |TSHARK       |             |WEB          | |
|               |CONNECT     <------+Filesystem   +<----+192.168.33.10|             |192.168.33.11| |
|               +-----+------+   |  +-------------+   | +-------------+             +-------------+ |
|                     |          |                    |                                             |
| +------+      +-----v------+   |                    | +-------------+             +-------------+ |
| |KSQL  |      |KAFKA       |   |                    | |DB           |             |SUSPECT      | |
| |      <------>CLUSTER     |   |                    | |192.168.33.12|             |192.168.33.66| |
| +------+      +------------+   |                    | +-------------+             +-------------+ |
|                                |                    |                                             |
+--------------------------------+                    +----------------192.168.33.0/24--------------+
```

# Vagrant installation

Below are detailed instruction for Ubuntu 18.04, for other distributions see [Vagrant official documentation](https://learn.hashicorp.com/tutorials/vagrant/getting-started-install).

_This project doesn't work under Windows, because we need both VirtualBox and Docker to run the full project_

## Install VirtualBox

Edit `/etc/apt/sources.list.d/virtualbox.list`:
```
deb [arch=amd64] https://download.virtualbox.org/virtualbox/debian bionic contrib
```

```
wget -q https://www.virtualbox.org/download/oracle_vbox_2016.asc -O- | sudo apt-key add -
sudo apt update
sudo apt-get install virtualbox-6.0
```

## Vagrant

Install package from [here](https://releases.hashicorp.com/vagrant/2.2.6/vagrant_2.2.6_x86_64.deb)

*Optionally* configure bash completion:

```
sudo cp /opt/vagrant/embedded/gems/2.2.6/gems/vagrant-2.2.6/contrib/bash/completion.sh /etc/bash_completion.d/vagrant
```


# Build app

Go to `infra/app`
```
cd infra/app
./mvnw -Pprod package
```

# Start machines

_Optionnaly_, you can start `apt-cacher-ng` before provisioning other VMs with:

```
vagrant up aptcache
```
This will cache all `deb` packages under `cache` directory.


```
vagrant up
```

When VMs are provisionned, you can stop `apt-cacher`:

```
vagrant halt aptcache
```


# Stop machines

```
vagrant halt
```

# Clean machines

```
vagrant destroy -f
```

# Start tshark agent

Automatically started.
Data will be created in `infra/data/logs` directory.

# Attack simulation

## Port scan
```
vagrant ssh compromised
nmap -n -sT -sV -sC 192.168.33.0/24
```

## DDoS
```
vagrant ssh compromised
slowhttptest -c 10000 -H -g -o slowhttp -i 10 -r 500 -t GET -u http://web.local:8080 -x 24 -p 3

```

Show the number of active connections per IP :
```
vagrant ssh web
netstat -ntu -4 -6 |  awk '/^tcp/{ print $5 }' | sed -r 's/:[0-9]+$//' |  sort | uniq -c | sort -n
```
