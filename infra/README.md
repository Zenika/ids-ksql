# Virtual infra for IDS-Kafka demo

| IP            | Server                       |
|:--------------|:-----------------------------|
| 192.168.33.10 | tshark                       |
| 192.168.33.11 | web (nginx on port 80)       |
| 192.168.33.12 | db (postgresql on port 5432) |
| 192.168.33.66 | intruder                     |
|               |                              |

# Start machines

```
vagrant up
```

# Stop machines

```
vagrant halt
```

# Start tshark agent

```
vagrant ssh tshark
mkdir -p /vagrant/data
docker run --net=host  -v /vagrant/data/logs:/logs -it --rm --privileged tshark
```

# Attack simulation

```
vagrant ssh intruder
nmap -n -sT -sV -sC 192.168.33.0/24
```
