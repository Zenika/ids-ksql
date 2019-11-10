# Virtual infra for IDS-Kafka demo

| IP            | Server                       |
|:--------------|:-----------------------------|
| 192.168.33.10 | tshark                       |
| 192.168.33.11 | web (nginx on port 80)       |
| 192.168.33.12 | db (postgresql on port 5432) |
| 192.168.33.66 | intruder                     |
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

# Vagrant installation (Ubuntu 18.04)

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


# Start machines

```
vagrant up
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

```
vagrant ssh intruder
nmap -n -sT -sV -sC 192.168.33.0/24
```
